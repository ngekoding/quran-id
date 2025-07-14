<template>
  <!-- Dialog options -->
  <q-dialog v-model="showDialog" v-if="showDialog">
    <q-card class="bg-primary" style="width: 80vw">
      <q-card-section class="row items-center text-white">
        <div class="text-h6">Ayat {{ ayahNumber }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section
        v-if="range"
        class="bg-grey-2 row items-center q-gutter-x-xs"
      >
        <q-input
          v-model.number="startAyah"
          type="number"
          :min="1"
          label="Dari ayat"
          class="col ayah-range-input"
          bg-color="white"
          dense
          outlined
        />
        <q-input
          v-model.number="endAyah"
          type="number"
          :min="startAyah"
          :max="ayahCount"
          label="Sampai"
          class="col ayah-range-input"
          bg-color="white"
          dense
          outlined
        />
      </q-card-section>
      <q-list separator class="bg-white">
        <q-item clickable v-ripple @click="copy('ayah')">
          <q-item-section>
            Salin ayat
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="copy('translation')">
          <q-item-section>
            Salin terjemahan
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="copy('both')">
          <q-item-section>
            Salin ayat dan terjemahan
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard } from "quasar";
export default {
  name: "AyahCopyOptionsDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    surahName: {
      type: String,
      required: true
    },
    ayahNumber: {
      type: [Number, String],
      required: true
    },
    ayahCount: {
      type: [Number, String]
    },
    ayahs: {
      type: Array,
      required: true
    },
    range: {
      type: Boolean
    }
  },
  data() {
    return {
      showDialog: false,
      startAyah: null,
      endAyah: null
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.showDialog = val;
        this.endAyah = null;
      }
    },
    showDialog(val) {
      this.$emit("update:show", val);
    },
    ayahNumber(val) {
      this.startAyah = val;
    }
  },
  methods: {
    copy(type) {
      if (!this.startAyah) {
        this.$q.notify({
          type: "toast-error",
          message: "Harap isikan nomor ayat mulai."
        });
        return;
      }

      const copyEndAyah = Math.min(
        Number(this.endAyah) || this.startAyah,
        Number(this.ayahCount) || this.startAyah
      );

      const startIndex = this.ayahs.findIndex(
        ayah => ayah.ayahNumber == this.startAyah
      );
      const endIndex = this.ayahs.findIndex(
        ayah => ayah.ayahNumber == copyEndAyah
      );

      const ayahsToCopy = this.ayahs.slice(startIndex, endIndex + 1);

      let ayahNumber = this.startAyah;
      const formattedAyahs = ayahsToCopy.map(ayah => {
        const arabic = this.stripHtmlTags(ayah.arabic);
        const translation = ayah.translation;
        const footer = `QS. ${this.surahName}: ${ayahNumber++}`;

        if (type === "ayah") {
          return `${arabic}\n\n${footer}`;
        } else if (type === "translation") {
          return `${translation}\n\n${footer}`;
        } else if (type === "both") {
          return `${arabic}\n\n${translation}\n\n${footer}`;
        } else {
          return "";
        }
      });

      let copiedText = formattedAyahs.join("\n\n");
      copiedText = this.removeFootNote(copiedText);

      copyToClipboard(copiedText)
        .then(() => {
          this.$q.notify({
            type: "toast",
            message: "Berhasil disalin."
          });
        })
        .catch(() => {
          this.$q.notify({
            type: "toast-error",
            message: "Gagal! Terjadi kesalahan."
          });
        });
    }
  }
};
</script>

<style lang="scss">
.ayah-range-input {
  .q-field__control:before,
  .q-field__control:after {
    border: none !important;
  }
}
</style>
