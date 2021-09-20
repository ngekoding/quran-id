<template>
  <div class="quran-reader-detail-list-mode">
    <!-- Scroll handler -->
    <page-scroll-position-handler
      :listen="!init && active"
      :page="page"
      :extra="scrollExtra"
      @scroll="position => (activeOffsetTop = position)"
    />
    <!-- Quran reader detail skeleton -->
    <quran-reader-detail-skeleton
      v-if="$store.state.quran.loading.fetchSurah"
    />
    <template v-else>
      <div
        class="content bg-white"
        :style="[{ 'padding-bottom': '64px' }, contentStyles]"
      >
        <!-- Basmallah -->
        <div
          class="text-basmalah text-center q-py-md"
          style="font-size: 22pt"
          v-if="surah.bismillahPre"
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
    <!-- Ayah options dialog -->
    <ayah-options-dialog
      :show.sync="showAyahOptionsDialog"
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
import QuranReaderDetailSkeleton from "../skeletons/QuranReaderDetailSkeleton.vue";
import AyahOptionsDialog from "src/components/AyahOptionsDialog.vue";
import ToTop from "src/components/ToTop.vue";
import PageScrollPositionHandler from "src/components/PageScrollPositionHandler.vue";

export default {
  name: "QuranDetailListMode",
  components: {
    QuranReaderDetailSkeleton,
    AyahOptionsDialog,
    ToTop,
    PageScrollPositionHandler
  },
  props: {
    surahId: {
      type: Number,
      required: true
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    verseKey: {
      type: String
    },
    headerHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      init: true,
      active: false,
      page: "quran-reader-detail-mode",
      showAyahOptionsDialog: false,
      showAyahChangerDialog: false,
      showSurahChangerDialog: false,
      ayahOptionsDialogData: {
        ayahNumber: "",
        surahName: "",
        arabic: "",
        translation: ""
      },
      currentAyah: 1,
      ayahChangerKeyword: null,
      activeOffsetTop: 0
    };
  },
  watch: {
    surahId: "getSurahDetail",
    showAyahChangerDialog() {
      this.ayahChangerKeyword = null;
    }
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurah"
    }),
    scrollExtra() {
      const surahSimple = Object.assign({}, this.surah);
      delete surahSimple.ayahs;
      delete surahSimple.translations;
      return {
        readingMode: false,
        surah: surahSimple
      };
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
    },
    contentStyles() {
      return {
        minHeight: `calc(100vh - ${this.headerHeight}px)`
      };
    }
  },
  methods: {
    getSurahDetail() {
      this.$store.dispatch("quran/fetchSurah", this.surahId).then(_ => {
        this.$nextTick(() => {
          this.init = false;
          window.scrollTo(0, this.offsetTop);
          if (this.verseKey) {
            this.scrollToElement(this.$refs[this.verseKey][0].$el);
          }
        });
      });
    },
    verseNumberFromKey(key) {
      return key.split(":")[1];
    },
    onOptionClicked(arabic, translation) {
      this.ayahOptionsDialogData = {
        surahName: this.surah.nameSimple,
        ayahNumber: translation.verse_number,
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
    bookmark() {
      this.$q.notify({
        type: "toast-warning",
        message: "Maaf fitur ini belum tersedia."
      });
    }
  },
  created() {
    this.getSurahDetail();
  },
  activated() {
    this.active = true;
    window.scrollTo(0, this.activeOffsetTop);
  },
  deactivated() {
    this.active = false;
  }
};
</script>
