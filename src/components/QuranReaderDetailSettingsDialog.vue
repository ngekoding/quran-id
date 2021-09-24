<template>
  <!-- Dialog options -->
  <q-dialog
    ref="dialog"
    v-model="showDialog"
    v-if="showDialog"
    no-backdrop-dismiss
  >
    <q-card class="bg-primary" style="width: 80vw">
      <q-card-section class="row items-center text-white">
        <div class="text-h6">Pengaturan</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-list class="bg-white q-pb-md">
        <q-item-label header>Pengaturan pembacaan</q-item-label>
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-sm">Qari</q-item-label>
            <q-select
              dense
              outlined
              v-model="audioReciterId"
              :options="reciterList"
              :option-label="
                item =>
                  item.style
                    ? `${item.reciterName} (${item.style})`
                    : item.reciterName
              "
              option-value="id"
              emit-value
              map-options
            />
            <div class="setting-note text-caption text-grey-7 q-mt-sm">
              Apabila qari diubah saat mendengarkan bacaan, maka perubahan akan
              dimulai pada pembacaan ayat selanjutnya.
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-sm">
              Pengulangan ayat ini
            </q-item-label>
            <v-number-input
              v-if="!singleRepeatNumberInfinite"
              v-model="singleRepeatNumber"
              :min="2"
              :max="998"
              class="q-mb-sm"
              controls
              center
            />
            <q-toggle
              v-model="singleRepeatNumberInfinite"
              label="Tanpa batas"
              size="sm"
              dense
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="q-mb-sm">
              Pengulangan ayat berlanjut
            </q-item-label>
            <v-number-input
              v-if="!continuedRepeatNumberInfinite"
              v-model="continuedRepeatNumber"
              :min="2"
              :max="998"
              class="q-mb-sm"
              controls
              center
            />
            <q-toggle
              v-model="continuedRepeatNumberInfinite"
              label="Tanpa batas"
              size="sm"
              dense
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-card-actions align="right" class="bg-white">
        <q-btn v-close-popup rounded flat color="dark" label="Batal" />
        <q-btn rounded flat color="primary" label="Simpan" @click="save()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import reciterList from "src/data/reciter-list";
import VueNumberInput from "@chenfengyuan/vue-number-input";

export default {
  name: "QuranReaderDetailSettingsDialog",
  components: {
    "v-number-input": VueNumberInput
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
      reciterList,
      audioReciterId: "",
      singleRepeatNumber: 2,
      singleRepeatNumberInfinite: true,
      continuedRepeatNumber: 2,
      continuedRepeatNumberInfinite: true
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.showDialog = val;
        this.getStoredPlayerSettings();
      }
    },
    showDialog(val) {
      this.$emit("update:show", val);
    },
    singleRepeatNumberInfinite(val) {
      if (!val) {
        this.singleRepeatNumber = 2;
      }
    },
    continuedRepeatNumberInfinite(val) {
      if (!val) {
        this.continuedRepeatNumber = 2;
      }
    }
  },
  methods: {
    getStoredPlayerSettings() {
      const playerSettings = this.$store.getters["quran/getPlayerSettings"];
      this.audioReciterId = playerSettings.audioReciterId;
      this.singleRepeatNumber = playerSettings.singleRepeatNumber;
      this.singleRepeatNumberInfinite = this.singleRepeatNumber == 999;
      this.continuedRepeatNumber = playerSettings.continuedRepeatNumber;
      this.continuedRepeatNumberInfinite = this.continuedRepeatNumber == 999;
    },
    save() {
      const playerSettings = {
        audioReciterId: this.audioReciterId,
        singleRepeatNumber: this.singleRepeatNumberInfinite
          ? 999
          : this.singleRepeatNumber,
        continuedRepeatNumber: this.continuedRepeatNumberInfinite
          ? 999
          : this.continuedRepeatNumber
      };
      this.$store.dispatch("quran/updatePlayerSettings", playerSettings);
      this.$refs.dialog.hide();
    }
  }
};
</script>

<style scoped>
.setting-note {
  line-height: 0.95rem;
}
</style>
