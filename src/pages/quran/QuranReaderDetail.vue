<template>
  <div class="quran-reader-detail">
    <!-- Scroll handler -->
    <q-scroll-observer @scroll="onScroll" />
    <!-- Quran reader detail skeleton -->
    <quran-reader-detail-skeleton
      v-if="$store.state.quran.loading.fetchSurah"
    />
    <template v-else>
      <q-header ref="header" class="bg-transparent">
        <q-toolbar ref="toolbar" class="bg-white text-black q-py-sm">
          <q-btn icon="arrow_back" flat round dense @click="$router.go(-1)" />
          <q-item class="q-py-sm q-px-sm">
            <q-item-section>
              <q-item-label>{{ surah.name_simple }}</q-item-label>
              <q-item-label caption>
                {{ surahNameTranslation }}, {{ surah.verses_count }} ayat
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-space />
          <q-btn
            flat
            rounded
            dense
            icon-right="arrow_drop_down"
            @click="prepareAyahChange()"
            class="nowrap"
          >
            {{ currentAyah }}
          </q-btn>
          <q-btn flat round dense icon="bookmark_border" @click="bookmark()" />
        </q-toolbar>
        <q-separator />
      </q-header>
      <div
        class="content bg-white"
        :style="[{ 'padding-bottom': '64px' }, contentStyles]"
      >
        <!-- Basmallah -->
        <div
          class="text-basmalah text-center q-py-md"
          style="font-size: 22pt"
          v-if="surah.bismillah_pre"
        >
          {{ basmalahArabic }}
        </div>
        <q-list separator>
          <q-item
            v-for="(ayah, index) in surah.ayahs"
            :key="ayah.verse_key"
            class="q-pt-md"
            :ref="ayah.verse_key"
          >
            <q-item-section>
              <q-item-label class="text-arabic text-right">
                {{ ayah.text_uthmani }}
                <span
                  class="text-arabic-number q-mr-xs"
                  v-html="arabicNumber(verseNumberFromKey(ayah.verse_key))"
                />
              </q-item-label>
              <q-item-label class="q-pt-sm translation-wrap">
                <span>{{ verseNumberFromKey(ayah.verse_key) + ". " }}</span>
                <span v-html="surah.translations[index].text" />
              </q-item-label>
              <q-btn
                icon="more_vert"
                color="grey-3"
                text-color="black"
                class="self-end"
                size="xs"
                round
                dense
                unelevated
                @click="onOptionClicked(ayah, surah.translations[index])"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </template>
    <!-- Dialog options -->
    <ayah-options-dialog
      :show="showAyahOptionsDialog"
      :ayah-number="ayahOptionsDialogData.ayahNumber"
      :surah-name="ayahOptionsDialogData.surahName"
      :arabic="ayahOptionsDialogData.arabic"
      :translation="ayahOptionsDialogData.translation"
    />
    <!-- Dialog ayah changer -->
    <q-dialog v-model="showAyahChangerDialog">
      <q-card class="bg-primary" style="width: 80vw">
        <q-card-section class="row items-center text-white">
          <div class="text-h6">Pergi ke ayat</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="bg-white">
          <q-input
            rounded
            outlined
            v-model="ayahChangerKeyword"
            placeholder="Filter nomor ayat..."
            dense
            type="number"
            min="1"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
        <q-list separator class="scroll bg-white" style="max-height: 60vh">
          <q-item v-if="ayahsChangerFiltered.length == 0">
            <q-item-section class="text-center text-grey-6">
              Tidak tersedia
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-for="ayah in ayahsChangerFiltered"
            :key="'ayah-changer-' + ayah.verse_key"
            @click="onAyahChange(ayah)"
          >
            <q-item-section>
              Ayat {{ verseNumberFromKey(ayah.verse_key) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
    <!-- Go to top -->
    <to-top />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuranReaderDetailSkeleton from "./skeletons/QuranReaderDetailSkeleton.vue";
import AyahOptionsDialog from "src/components/AyahOptionsDialog.vue";
import ToTop from "src/components/ToTop.vue";
export default {
  name: "QuranReaderDetail",
  components: {
    QuranReaderDetailSkeleton,
    AyahOptionsDialog,
    ToTop
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    verseKey: {
      type: String
    }
  },
  data() {
    return {
      init: true,
      showAyahOptionsDialog: false,
      showAyahChangerDialog: false,
      ayahOptionsDialogData: {
        ayahNumber: "",
        surahName: "",
        arabic: "",
        translation: ""
      },
      currentAyah: 1,
      ayahChangerKeyword: null,
      contentStyles: null
    };
  },
  meta() {
    return {
      title: this.pageTitle
    };
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurah"
    }),
    pageTitle() {
      if (!this.surah) return this.productName;
      return (
        "QS. " +
        this.surah.name_simple +
        " | " +
        this.surahNameTranslation +
        " | " +
        this.productName
      );
    },
    surahNameTranslation() {
      return this.normalizeSurahNameTranslation(
        this.surah?.translated_name.name
      );
    },
    surahSimple() {
      const surahSimple = Object.assign({}, this.surah);
      delete surahSimple.ayahs;
      delete surahSimple.translations;
      return surahSimple;
    },
    ayahsChangerFiltered() {
      if (this.ayahChangerKeyword) {
        return this.surah.ayahs.filter(ayah =>
          this.verseNumberFromKey(ayah.verse_key).startsWith(
            this.ayahChangerKeyword
          )
        );
      }
      return this.surah?.ayahs ?? [];
    }
  },
  methods: {
    onScroll(info) {
      if (["up", "down"].includes(info.direction) && !this.init) {
        this.updateSurahLastRead(info.position);
      }
    },
    fitContentHeight() {
      const headerHeight = this.$refs.header.$el.clientHeight + "px";
      this.contentStyles = {
        minHeight: `calc(100vh - ${headerHeight})`
      };
    },
    verseNumberFromKey(key) {
      return key.split(":")[1];
    },
    onOptionClicked(arabic, translation) {
      this.ayahOptionsDialogData = {
        ayahNumber: translation.verse_number,
        surahName: this.surah.name_simple,
        arabic: arabic.text_uthmani,
        translation: translation.text
      };
      this.showAyahOptionsDialog = true;
    },
    prepareAyahChange() {
      this.showAyahChangerDialog = true;
    },
    onAyahChange(ayah) {
      this.showAyahChangerDialog = false;
      this.currentAyah = this.verseNumberFromKey(ayah.verse_key);
      this.scrollToElement(this.$refs[ayah.verse_key][0].$el);
    },
    updateSurahLastRead(position) {
      this.$store.dispatch("quran/setSurahLastRead", {
        surah: this.surahSimple,
        offsetTop: position
      });
    },
    bookmark() {
      this.$q.notify({
        type: "toast-warning",
        message: "Maaf fitur ini belum tersedia."
      });
    }
  },
  created() {
    this.$store
      .dispatch("quran/fetchSurah", this.$route.params.surahId)
      .then(_ => {
        this.$nextTick(() => {
          this.init = false;
          this.track(this.pageTitle);
          this.fitContentHeight();
          window.scrollTo(0, this.offsetTop);
          if (this.verseKey) {
            this.scrollToElement(this.$refs[this.verseKey][0].$el);
          }
        });
      });
  }
};
</script>
