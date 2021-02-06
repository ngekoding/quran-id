<template>
  <div class="quran-reader-detail">
    <quran-reader-detail-skeleton
      v-if="$store.state.quran.loading.fetchSurah"
    />
    <template v-else>
      <q-header class="bg-transparent">
        <q-toolbar class="bg-white text-black q-py-sm">
          <q-btn icon="arrow_back" flat round dense @click="$router.go(-1)" />
          <q-item class="q-py-sm q-px-sm">
            <q-item-section>
              <q-item-label>{{ surah.name_simple }}</q-item-label>
              <q-item-label caption>
                {{ surah.translated_name.name }}, {{ surah.verses_count }} ayat
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-space />
          <q-btn flat round dense icon="bookmark_border" />
        </q-toolbar>
        <q-separator color="grey-3" />
      </q-header>
      <div class="content bg-white">
        <!-- Basmallah -->
        <div
          class="text-arabic text-center q-py-md"
          style="font-size: 16pt"
          v-if="surah.bismillah_pre"
        >
          {{ basmallahArabic }}
        </div>
        <q-list>
          <div v-for="(ayah, index) in surah.ayahs" :key="ayah.verse_number">
            <q-item class="q-py-md">
              <q-item-section>
                <q-item-label class="text-arabic text-right">
                  {{ ayah.text_madani }}
                </q-item-label>
                <q-item-label class="q-pt-sm translation-wrap">
                  <span>{{ ayah.verse_number + "." }}</span>
                  <span v-html="ayah.translations[0].text" />
                </q-item-label>
              </q-item-section>
              <q-item-section
                side
                class="q-mt-sm row item-center justify-between"
              >
                <div class="self-center">
                  {{ arabicNumber(ayah.verse_number) }}
                </div>
                <q-btn
                  icon="more_vert"
                  color="grey-3"
                  text-color="black"
                  size="xs"
                  round
                  dense
                  unelevated
                  @click="onOptionClicked(ayah)"
                />
              </q-item-section>
            </q-item>
            <q-separator
              v-if="index != surah.ayahs.length - 1"
              color="grey-3"
            />
          </div>
        </q-list>
      </div>
    </template>
    <!-- Dialog options -->
    <q-dialog ref="dialogOptions" v-model="showDialogOptions">
      <q-card class="bg-primary" style="width: 80vw">
        <q-card-section
          v-if="ayahDialogOptions"
          class="row items-center  text-white"
        >
          <div class="text-h6">Ayat {{ ayahDialogOptions.verse_number }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-list separator class="bg-white">
          <q-item clickable v-ripple>
            <q-item-section @click="copy('ayah')">
              Salin ayat
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="copy('translation')">
              Salin terjemahan
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="copy('both')">
              Salin ayat dan terjemahan
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              Bookmark
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { copyToClipboard } from "quasar";
import { mapGetters } from "vuex";
import { toArabic } from "arabic-digits";
import QuranReaderDetailSkeleton from "./skeletons/QuranReaderDetailSkeleton.vue";
export default {
  name: "QuranReaderDetail",
  components: {
    QuranReaderDetailSkeleton
  },
  data() {
    return {
      basmallahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDialogOptions: false,
      ayahDialogOptions: null
    };
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurah"
    })
  },
  methods: {
    arabicNumber(number) {
      return toArabic(number);
    },
    onOptionClicked(ayah) {
      this.ayahDialogOptions = ayah;
      this.showDialogOptions = true;
    },
    copy(type) {
      let text;
      const ayah = this.ayahDialogOptions;
      if (type == "ayah") {
        text = ayah.text_madani;
      } else if (type == "translation") {
        text = ayah.translations[0].text;
      } else if (type == "both") {
        text = ayah.text_madani + "\n\n" + ayah.translations[0].text;
      }

      text += "\n\n";
      text += `QS. ${this.surah.name_simple}: ${ayah.verse_number}`;
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
    }
  },
  created() {
    this.$store.dispatch("quran/fetchSurah", this.$route.params.surahId);
  }
};
</script>
