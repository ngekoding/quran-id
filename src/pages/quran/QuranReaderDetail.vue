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
          flat
          round
          dense
          :icon="readingMode ? 'menu_book' : 'import_contacts'"
          @click="readingMode = !readingMode"
        />
        <q-btn
          icon="mdi-dots-vertical"
          flat
          round
          dense
          @click="showMenuMoreDialog = true"
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

    <!-- Menu more dialog -->
    <q-dialog v-model="showMenuMoreDialog" position="bottom">
      <q-card class="full-width">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Lainnya</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-list separator padding>
          <q-item clickable v-ripple v-close-popup @click="prepareAyahChange()">
            <q-item-section avatar>
              <q-icon name="mdi-priority-low" />
            </q-item-section>
            <q-item-section>Pergi ke nomor ayat</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-close-popup
            @click="showSurahChangerDialog = true"
          >
            <q-item-section avatar>
              <q-icon name="mdi-format-list-text" />
            </q-item-section>
            <q-item-section>Pindah surah</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-close-popup
            @click="showSettingsDialog = true"
          >
            <q-item-section avatar>
              <q-icon name="mdi-tune" />
            </q-item-section>
            <q-item-section>Pengaturan</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

    <!-- Settings dialog -->
    <quran-reader-detail-settings-dialog :show.sync="showSettingsDialog" />
  </div>
</template>

<script>
import QuranReaderDetailListMode from "./components/QuranReaderDetailListMode.vue";
import QuranReaderDetailReadingMode from "./components/QuranReaderDetailReadingMode.vue";
import QuranReaderDetailSettingsDialog from "src/components/QuranReaderDetailSettingsDialog.vue";
import SurahChangerDialog from "src/components/SurahChangerDialog.vue";

import surahList from "src/data/surah-list";

export default {
  name: "QuranReaderDetail",
  components: {
    QuranReaderDetailReadingMode,
    QuranReaderDetailListMode,
    QuranReaderDetailSettingsDialog,
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
      readingMode: false,
      showSettingsDialog: false,
      showMenuMoreDialog: false
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
    },
    onMenuMore() {
      this.$refs.menuMore.setState("half");
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
