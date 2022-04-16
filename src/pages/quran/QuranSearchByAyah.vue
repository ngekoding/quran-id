<template>
  <div class="quran-search-by-ayah">
    <!-- Scroll handler -->
    <page-scroll-position-handler :listen="!init" :page="page" />
    <q-header ref="header" class="bg-transparent">
      <q-toolbar ref="toolbar" class="bg-white text-black q-py-sm">
        <q-btn icon="arrow_back" flat round dense @click="$router.go(-1)" />
        <q-item class="q-py-sm q-px-sm">
          <q-item-section>
            <q-item-label>Pencarian Ayat</q-item-label>
            <q-item-label caption>
              Cari berdasarkan potongan ayat
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-toolbar>
      <q-separator />
    </q-header>
    <div class="content bg-white" :style="contentStyles">
      <div class="q-px-md q-py-md bg-grey-1">
        <q-input
          v-model="keyword"
          type="search"
          :placeholder="!inputFocusReady ? 'Masukkan kata kunci...' : ''"
          :input-class="['q-px-sm', { 'text-right': inputFocusReady }]"
          :dir="inputFocusReady ? 'rtl' : 'ltr'"
          outlined
          dense
          clearable
          :dark="false"
          bg-color="white"
          @focus="() => (inputFocus = true)"
          @blur="() => (inputFocus = false)"
        >
          <template v-slot:prepend>
            <q-avatar>
              <q-img src="~assets/images/icons/abjad_arabic_icon.svg" />
            </q-avatar>
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="search" @click="onSearch" />
          </template>
        </q-input>
        <!-- Search options -->
        <div class="row items-center q-mt-sm">
          <q-toggle v-model="fullMatchSearch" dense />
          <div class="row q-ml-sm">
            <div class="text-body1">Pencarian penuh kata</div>
            <div
              class="row items-center text-primary q-ml-sm cursor-pointer"
              @click="fullMatchSearchDialog = true"
            >
              <q-icon name="contact_support" />
              <span class="text-caption q-ml-xs">Info</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Search results information -->
      <div v-if="!keywordSearch" class="column items-center q-pa-lg">
        <q-icon name="auto_stories" size="60px" class="text-grey-8" />
        <p class="text-center text-body1 text-grey-7 q-mt-md">
          Masukkan kata kunci pencarian dalam tulisan arab untuk mulai mencari.
        </p>
      </div>
      <template v-if="keywordSearch && !$store.state.quran.loading.searchAyah">
        <div
          v-if="searchResults.length == 0"
          class="column items-center q-pa-lg"
        >
          <q-icon name="blur_on" size="60px" class="text-grey-8" />
          <p class="text-center text-body1 text-grey-7 q-mt-md">
            Tidak dapat menemukan ayat dengan kata kunci
            <span class="text-primary">{{ keywordSearch }}</span
            >. Silahkan coba dengan kata kunci yang lain.
          </p>
        </div>
        <!-- Only show search results count if full match search if disabled -->
        <p
          v-else-if="searchPaging.total != 0 && !fullMatchSearch"
          class="text-center text-body1 text-primary q-pa-lg"
          style="line-height: 18px"
        >
          Berhasil menemukan
          <span class="text-bold">{{ searchPaging.total }}</span>
          ayat<br />dengan kata kunci
          <span class="text-bold">{{ keywordSearch }}</span>
        </p>
      </template>

      <q-list v-if="searchResults.length > 0" separator>
        <q-item
          v-for="item in searchResults"
          :key="item.verse_id"
          class="q-pt-md"
          clickable
        >
          <q-item-section>
            <div @click="showDetail(item)">
              <q-item-label class="text-arabic text-right">
                <span v-html="item.text" />
                <span
                  class="text-arabic-number q-mr-sm"
                  v-html="arabicNumber(item.ayahNumber)"
                />
              </q-item-label>
              <q-item-label class="q-pt-sm translation-wrap">
                <span>{{ item.ayahNumber + ". " }}</span>
                <span v-html="getTranslation(item.verse_key)" />
              </q-item-label>
            </div>
            <q-item-label class="row q-py-sm translation-wrap">
              <span class="col-grow">
                QS. {{ `${item.surahName}: ${item.ayahNumber}` }}
              </span>
              <q-btn
                icon="more_vert"
                color="grey-3"
                text-color="black"
                class="self-end"
                size="xs"
                round
                dense
                unelevated
                @click="onOptionClicked(item)"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <quran-search-result-skeleton
        v-if="$store.state.quran.loading.searchAyah"
      />
      <div v-if="isLoadMoreAvailable" class="q-py-md row justify-center">
        <q-btn
          outline
          rounded
          color="primary"
          label="Lebih Banyak"
          @click="onLoadMore()"
        />
      </div>
      <p
        v-if="!isLoadMoreAvailable && searchResults.length != 0"
        class="text-grey text-center q-py-md"
      >
        Sudah ditampilkan semua
      </p>
    </div>
    <!-- Dialog options -->
    <ayah-options-dialog
      :show.sync="showAyahOptionsDialog"
      :ayah-number="ayahOptionsDialogData.ayahNumber"
      :surah-name="ayahOptionsDialogData.surahName"
      :arabic="ayahOptionsDialogData.arabic"
      :translation="ayahOptionsDialogData.translation"
    />
    <!-- Dialog full match search information -->
    <q-dialog v-model="fullMatchSearchDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 row items-center">
            <q-icon name="contact_support" />
            <span class="q-ml-xs">Pencarian penuh kata</span>
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <p>
            Secara default, proses pencarian akan mencari kecocokan setiap kata
            pada kata kunci yang diberikan. Misalnya dengan kata kunci
            <b>من طين</b>, maka akan mencari ayat yang mengandung kata
            <b>من</b> atau <b>طين</b>.
          </p>
          <p>
            Apabila fitur <b>pencarian penuh kata</b> diaktifkan, maka hanya
            akan mencari ayat yang persis mengandung kata <b>من طين</b>.
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Go to top -->
    <to-top />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LocalStorage } from "quasar";
import QuranSearchResultSkeleton from "./skeletons/QuranSearchResultSkeleton.vue";
import AyahOptionsDialog from "src/components/AyahOptionsDialog.vue";
import ToTop from "src/components/ToTop.vue";
import PageScrollPositionHandler from "src/components/PageScrollPositionHandler.vue";
export default {
  name: "QuranSearchByAyah",
  components: {
    QuranSearchResultSkeleton,
    AyahOptionsDialog,
    ToTop,
    PageScrollPositionHandler
  },
  data() {
    return {
      init: true,
      page: "quran-search-by-ayah",
      keyword: "",
      keywordSearch: "",
      inputFocus: false,
      fullMatchSearch: this.$store.state.quran.searchAyah.fullMatch,
      fullMatchSearchDialog: false,
      contentStyles: null,
      showAyahOptionsDialog: false,
      ayahOptionsDialogData: {
        ayahNumber: "",
        surahName: "",
        arabic: "",
        translation: ""
      }
    };
  },
  meta() {
    return {
      title: this.pageTitle
    };
  },
  watch: {
    fullMatchSearch(val) {
      this.$store.dispatch("quran/setFullMatchSearch", val);
      this.onSearch();
    }
  },
  computed: {
    ...mapGetters({
      searchResults: "quran/getSearchAyahResults",
      searchResultTranslations: "quran/getSearchAyahResultTranslations",
      searchPaging: "quran/getSearchAyahPaging"
    }),
    isLoadMoreAvailable() {
      return this.searchPaging.currentPage < this.searchPaging.totalPage;
    },
    inputFocusReady() {
      return this.keyword || this.inputFocus;
    },
    pageTitle() {
      return (
        "Pencarian Ayat | " +
        (this.keywordSearch ? this.keywordSearch + " | " : "") +
        this.productName
      );
    }
  },
  methods: {
    getScrollPosition() {
      return (
        this.$store.getters["quran/getPageScrollPosition"](this.page)
          ?.offsetTop ?? 0
      );
    },
    fitContentHeight() {
      const headerHeight = this.$refs.header.$el.clientHeight + "px";
      this.contentStyles = {
        minHeight: `calc(100vh - ${headerHeight})`
      };
    },
    saveLastKeyword() {
      LocalStorage.set("search-keyword", this.keywordSearch);
    },
    getLastKeyword() {
      return LocalStorage.getItem("search-keyword");
    },
    onSearch() {
      this.$store.dispatch("quran/resetSearchAyahPaging");
      this.$store.dispatch("quran/resetSearchAyahResults");
      this.keywordSearch = this.keyword;
      if (this.keywordSearch) this.search();
    },
    search(page) {
      this.track(this.pageTitle);
      this.saveLastKeyword();

      this.$store
        .dispatch("quran/searchByAyah", { keyword: this.keywordSearch, page })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoadMore() {
      this.search(this.searchPaging.currentPage + 1);
    },
    showDetail(item) {
      this.$router.push({
        name: "QuranReaderDetail",
        params: {
          surahId: item.surahId,
          verseKey: item.surahId + ":" + item.ayahNumber
        }
      });
    },
    getTranslation(verse_key) {
      return this.searchResultTranslations.find(
        item => item.verse_key == verse_key
      )?.text;
    },
    onOptionClicked(item) {
      this.ayahOptionsDialogData = {
        ayahNumber: item.ayahNumber,
        surahName: item.surahName,
        arabic: item.text,
        translation: this.getTranslation(item.verse_key)
      };
      this.showAyahOptionsDialog = true;
    }
  },
  mounted() {
    this.track(this.pageTitle);
    this.fitContentHeight();

    this.$nextTick(() => {
      window.scrollTo(0, this.getScrollPosition());
      this.init = false;
    });

    if (this.searchResults.length > 0) {
      this.keywordSearch = this.getLastKeyword();
      this.keyword = this.getLastKeyword();
    }
  }
};
</script>
