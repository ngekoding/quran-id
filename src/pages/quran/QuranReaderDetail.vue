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
          icon="import_contacts"
          @click="showModeSwitcherDialog = true"
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
          <q-item
            v-if="mode != 'reading'"
            clickable
            v-ripple
            v-close-popup
            @click="prepareAyahChange()"
          >
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
              <q-icon name="mdi-format-align-bottom" />
            </q-item-section>
            <q-item-section>Pindah surah</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-close-popup
            @click="showTajweedDialog = true"
          >
            <q-item-section avatar>
              <q-icon name="mdi-bookmark-outline" />
            </q-item-section>
            <q-item-section>Keterangan warna tajwid</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-close-popup
            @click="showSettingsDialog = true"
          >
            <q-item-section avatar>
              <q-icon name="mdi-tune-variant" />
            </q-item-section>
            <q-item-section>Pengaturan</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

    <!-- Settings dialog -->
    <quran-reader-detail-settings-dialog :show.sync="showSettingsDialog" />

    <!-- Tajweed information dialog -->
    <tajweed-information-dialog :show.sync="showTajweedDialog" />

    <!-- Mode switcher dialog -->
    <q-dialog v-model="showModeSwitcherDialog">
      <q-card class="bg-primary" style="width: 80vw">
        <q-card-section class="row items-center text-white">
          <div class="text-h6">Pilih mode</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-list separator class="bg-white">
          <q-item clickable v-ripple @click="mode = 'list'">
            <q-item-section>Reguler</q-item-section>
            <q-item-section v-if="mode == 'list'" avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="done"
                size="sm"
              />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="mode = 'reading'">
            <q-item-section>Pembacaan</q-item-section>
            <q-item-section v-if="mode == 'reading'" avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="done"
                size="sm"
              />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="mode = 'wbw'">
            <q-item-section>Per kata</q-item-section>
            <q-item-section v-if="mode == 'wbw'" avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="done"
                size="sm"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import QuranReaderDetailListMode from "./components/QuranReaderDetailListMode.vue";
import QuranReaderDetailReadingMode from "./components/QuranReaderDetailReadingMode.vue";
import QuranReaderDetailWordByWordMode from "./components/QuranReaderDetailWordByWordMode.vue";
import QuranReaderDetailSettingsDialog from "src/components/QuranReaderDetailSettingsDialog.vue";
import SurahChangerDialog from "src/components/SurahChangerDialog.vue";
import TajweedInformationDialog from "src/components/TajweedInformationDialog.vue";

import surahList from "src/data/surah-list";

export default {
  name: "QuranReaderDetail",
  components: {
    QuranReaderDetailReadingMode,
    QuranReaderDetailListMode,
    QuranReaderDetailWordByWordMode,
    QuranReaderDetailSettingsDialog,
    SurahChangerDialog,
    TajweedInformationDialog
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    verseKey: {
      type: String
    },
    activeMode: {
      type: String,
      default: "list",
      validator: val => ["list", "reading", "wbw"].includes(val)
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
      modeList: ["list", "reading", "wbw"],
      mode: "list",
      showSettingsDialog: false,
      showMenuMoreDialog: false,
      showTajweedDialog: false,
      showModeSwitcherDialog: false
    };
  },
  meta() {
    return {
      title: this.pageTitle
    };
  },
  watch: {
    activeMode: {
      immediate: true,
      handler(val) {
        this.mode = val;
      }
    },
    surahId: "trackDetail",
    mode() {
      this.showModeSwitcherDialog = false;
      this.trackDetail();
    }
  },
  computed: {
    surah() {
      return this.surahList.find(item => item.id == this.surahId);
    },
    modeText() {
      switch (this.mode) {
        case "reading":
          return "Reading";
        case "wbw":
          return "Word by Word";
        default:
          return "List";
      }
    },
    pageTitle() {
      if (!this.surah) return this.productName;
      return (
        "QS. " +
        this.surah.nameSimple +
        " | " +
        this.surah.nameTranslated +
        " | " +
        this.modeText +
        " | " +
        this.productName
      );
    },
    quranDetailComponent() {
      switch (this.mode) {
        case "reading":
          return "quran-reader-detail-reading-mode";
        case "wbw":
          return "quran-reader-detail-word-by-word-mode";
        default:
          return "quran-reader-detail-list-mode";
      }
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
