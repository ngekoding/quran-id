<template>
  <!-- Dialog options -->
  <q-dialog v-model="showDialog" v-if="showDialog">
    <q-card class="bg-primary" style="width: 80vw">
      <q-card-section class="row items-center text-white">
        <div class="text-h6">Ayat {{ ayahNumber }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
        <q-item clickable v-ripple @click="bookmark()">
          <q-item-section>
            Bookmark
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard } from "quasar";
export default {
  name: "AyahOptionsDialog",
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
    arabic: {
      type: String,
      required: true
    },
    translation: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showDialog: false
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.showDialog = val;
      }
    },
    showDialog(val) {
      this.$emit("update:show", val);
    }
  },
  computed: {
    arabicNormalized() {
      return this.arabic.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags
    }
  },
  methods: {
    copy(type) {
      let text;
      if (type == "ayah") {
        text = this.arabicNormalized;
      } else if (type == "translation") {
        text = this.translation;
      } else if (type == "both") {
        text = this.arabicNormalized + "\n\n" + this.translation;
      }

      text += "\n\n";
      text += `QS. ${this.surahName}: ${this.ayahNumber}`;
      text = this.removeFootNote(text);

      copyToClipboard(text)
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
    },
    bookmark() {
      this.$q.notify({
        type: "toast-warning",
        message: "Maaf fitur ini belum tersedia."
      });
    }
  }
};
</script>
