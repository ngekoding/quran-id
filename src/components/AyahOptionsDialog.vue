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
          <q-item-section> Salin ayat </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="copy('translation')">
          <q-item-section> Salin terjemahan </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="copy('both')">
          <q-item-section> Salin ayat dan terjemahan </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="bookmark()">
          <q-item-section> Bookmark </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from "vue";
import { copyToClipboard, useQuasar } from "quasar";

export default {
  name: "AyahOptionsDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    surahName: {
      type: String,
      required: true,
    },
    ayahNumber: {
      type: [Number, String],
      required: true,
    },
    arabic: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
  },
  emits: ["update:show"],
  setup(props, { emit }) {
    const $q = useQuasar();

    const showDialog = computed({
      get: () => props.show,
      set: (val) => emit("update:show", val),
    });

    const arabicNormalized = computed(() => {
      return props.arabic
        .replace(/<span.*?>.*?<\/span>/gi, "") // Remove verse number (end)
        .replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags
    });

    const copy = (type) => {
      const arabic = arabicNormalized.value;
      const translation = props.translation;
      let text;
      if (type == "ayah") {
        text = arabic;
      } else if (type == "translation") {
        text = translation;
      } else if (type == "both") {
        text = arabic + "\n\n" + translation;
      }

      text += "\n\n";
      text += `QS. ${props.surahName}: ${props.ayahNumber}`;
      text = this.removeFootNote(text); // Call mixins: not working

      copyToClipboard(text)
        .then(() => {
          $q.notify({
            type: "toast",
            message: "Berhasil disalin.",
          });
        })
        .catch(() => {
          $q.notify({
            type: "toast-error",
            message: "Gagal! Terjadi kesalahan.",
          });
        });
    };

    const bookmark = () => {
      $q.notify({
        type: "toast-warning",
        message: "Maaf fitur ini belum tersedia.",
      });
    };

    return {
      showDialog,
      copy,
      bookmark,
    };
  },
};
</script>
