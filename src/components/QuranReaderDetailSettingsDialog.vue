<template>
  <!-- Dialog options -->
  <q-dialog ref="dialog" v-model="showDialog" v-if="showDialog">
    <q-card class="bg-primary" style="width: 80vw">
      <q-card-section class="row items-center text-white">
        <div class="text-h6">Pengaturan</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="bg-white">
        <div class="text-subtitle1">Qari</div>
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
        <div class="qari-note text-caption text-grey-7 q-mt-md">
          Apabila qari diubah saat mendengarkan bacaan, maka perubahan akan
          dimulai pada pembacaan ayat selanjutnya.
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-white">
        <q-btn v-close-popup rounded flat color="dark" label="Batal" />
        <q-btn rounded flat color="primary" label="Simpan" @click="save()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import reciterList from "src/data/reciter-list";
export default {
  name: "QuranReaderDetailSettingsDialog",
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
      audioReciterId: ""
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.showDialog = val;
        this.audioReciterId = this.$store.getters["quran/getAudioReciterId"];
      }
    },
    showDialog(val) {
      this.$emit("update:show", val);
    }
  },
  methods: {
    save() {
      this.$store.dispatch("quran/changeAudioReciterId", this.audioReciterId);
      this.$refs.dialog.hide();
    }
  }
};
</script>

<style scoped>
.qari-note {
  line-height: 0.95rem;
}
</style>
