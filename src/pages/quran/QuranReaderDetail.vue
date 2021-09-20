<template>
  <div class="quran-reader-detail">
    <q-header ref="header" class="bg-transparent">
      <q-toolbar ref="toolbar" class="bg-white text-black q-py-sm">
        <q-btn icon="arrow_back" flat round dense @click="$router.go(-1)" />
        <q-item
          class="q-py-sm q-px-sm"
          clickable
          @click="showSurahChangerDialog = true"
        >
          <q-item-section>
            <q-item-label>{{ surah.nameSimple }}</q-item-label>
            <q-item-label caption>
              {{ normalizeSurahNameTranslation(surah.nameTranslated) }},
              {{ surah.versesCount }} ayat
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-space />
        <q-btn
          v-if="!readingMode"
          flat
          rounded
          dense
          icon="format_list_numbered_rtl"
          @click="prepareAyahChange()"
          class="nowrap"
        />
        <q-btn
          flat
          round
          dense
          :icon="readingMode ? 'menu_book' : 'import_contacts'"
          @click="readingMode = !readingMode"
        />
      </q-toolbar>
      <q-separator />
    </q-header>
    <!-- Quran detail -->
    <keep-alive v-if="surah">
      <component
        ref="quranDetail"
        :is="quranDetailComponent"
        :surah-id="surahId"
        :offset-top="offsetTop"
        :verse-key="verseKey"
        :header-height="headerHeight"
        :surah="surah"
        :pages="surah.pages"
        :active-page="activePage"
      />
    </keep-alive>

    <!-- Surah changer dialog -->
    <surah-changer-dialog
      :show.sync="showSurahChangerDialog"
      :active-surah-id="surahId"
      @item-click="onSurahChanged"
    />
  </div>
</template>

<script>
import QuranReaderDetailListMode from "./components/QuranReaderDetailListMode.vue";
import QuranReaderDetailReadingMode from "./components/QuranReaderDetailReadingMode.vue";
import SurahChangerDialog from "src/components/SurahChangerDialog.vue";
import surahList from "src/data/surah-list";

export default {
  name: "QuranReaderDetail",
  components: {
    QuranReaderDetailReadingMode,
    QuranReaderDetailListMode,
    SurahChangerDialog
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    verseKey: {
      type: String
    },
    readingModeActive: {
      type: Boolean,
      default: false
    },
    activePage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      surahList,
      headerHeight: 0,
      surahId: "",
      showSurahChangerDialog: false,
      contentStyles: null,
      readingMode: false
    };
  },
  meta() {
    return {
      title: this.pageTitle
    };
  },
  watch: {
    readingModeActive: {
      immediate: true,
      handler(val) {
        this.readingMode = val;
      }
    },
    surahId: "trackDetail",
    readingMode: "trackDetail"
  },
  computed: {
    surah() {
      return this.surahList.find(item => item.id == this.surahId);
    },
    pageTitle() {
      if (!this.surah) return this.productName;
      const reading = this.readingMode ? " | Reading Mode" : "";
      return (
        "QS. " +
        this.surah.nameSimple +
        " | " +
        this.surah.nameTranslated +
        reading +
        " | " +
        this.productName
      );
    },
    quranDetailComponent() {
      return this.readingMode
        ? "quran-reader-detail-reading-mode"
        : "quran-reader-detail-list-mode";
    }
  },
  methods: {
    trackDetail() {
      this.track(this.pageTitle);
    },
    onSurahChanged(id) {
      this.$router
        .replace({
          params: {
            surahId: id
          }
        })
        .then(() => {
          this.surahId = id;
        });
    },
    prepareAyahChange() {
      this.$refs.quranDetail.prepareAyahChange();
    }
  },
  created() {
    this.surahId = parseInt(this.$route.params.surahId);
    this.$nextTick(() => {
      this.headerHeight = this.$refs.header.$el.clientHeight;
      this.trackDetail();
    });
  }
};
</script>
