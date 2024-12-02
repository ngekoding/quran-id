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
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="info_outline"
          @click="fullMatchSearchDialog = true"
        />
      </q-toolbar>
      <q-separator />
    </q-header>
    <div class="content bg-white" :style="contentStyles">
      <div class="q-px-md q-py-md bg-grey-1">
        <div class="row items-center">
          <q-select
            v-model="keywordType"
            :options="keywordTypeOptions"
            option-value="value"
            option-label="label"
            class="col-auto q-mr-xs"
            outlined
            dense
            :dark="false"
            bg-color="white"
            behavior="menu"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section class="items-center">
                  <q-icon :name="scope.opt.icon" size="sm" />
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected>
              <q-icon v-if="keywordType" :name="keywordType.icon" size="sm" />
            </template>
          </q-select>
          <q-input
            v-model="keyword"
            type="search"
            :placeholder="!inputFocusReady ? 'Masukkan kata kunci...' : ''"
            class="col-grow"
            :input-class="[
              'q-px-sm',
              { 'text-right': inputFocusReady && !latinKeywordSearch }
            ]"
            :dir="inputFocusReady && !latinKeywordSearch ? 'rtl' : 'ltr'"
            outlined
            dense
            clearable
            :dark="false"
            bg-color="white"
            @focus="() => (inputFocus = true)"
            @blur="() => (inputFocus = false)"
          >
          </q-input>
        </div>
        <!-- Search options -->
        <q-select
          v-model="specificSurahs"
          :options="specificSurahOptions"
          option-value="id"
          option-label="nameSimple"
          placeholder="Pada surah..."
          class="q-mt-xs"
          use-chips
          outlined
          dense
          :dark="false"
          bg-color="white"
          multiple
          emit-value
          map-options
          behavior="menu"
          use-input
          :input-debounce="0"
          @filter="filterSpecificSurahOptions"
        />
        <div class="q-mt-sm">
          <q-toggle
            v-model="fullMatchSearch"
            label="Pencarian penuh kata"
            dense
          />
        </div>
        <q-btn
          color="primary"
          label="Mulai Pencarian"
          class="full-width q-mt-md"
          rounded
          @click="onSearch"
        />
      </div>
      <!-- Search results information -->
      <div v-if="!keywordSearch" class="column items-center q-pa-lg">
        <q-icon
          name="mdi-book-search-outline"
          size="60px"
          class="text-grey-8"
        />
        <p class="text-center text-body1 text-grey-7 q-mt-md">
          Masukkan kata kunci dan mulai pencarian.
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
          :key="item.verseKey"
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
                <span v-html="item.translation" />
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
            <q-icon name="info_outline" />
            <span class="q-ml-sm">Informasi</span>
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            Pencarian dengan Huruf Latin
          </div>
          <p>
            Apabila pencarian dengan huruf Latin dipilih, kata kunci dapat
            berupa kata dalam huruf Latin yang sesuai dengan
            <a
              href="pedoman-transliterasi-arab-latin.pdf"
              target="_blank"
              class="text-primary"
            >
              Pedoman Transliterasi Arab-Latin.
            </a>
          </p>
          <p>
            Untuk mempermudah penulisan, beberapa huruf berikut juga dapat
            ditulis menggunakan alternatifnya.
          </p>
          <q-table
            :data="latinAlternatives"
            :columns="latinAlternativeColumns"
            row-key="latin"
            :pagination="{ rowsPerPage: 0 }"
            dense
            flat
            bordered
            hide-pagination
          />
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1 text-weight-bold">
            Pencarian Penuh Kata
          </div>
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
import surahList from "src/data/surah-list";
import latinAlternatives from "src/data/latin-alternatives";

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
      keywordTypeOptions: [
        { value: "arabic", label: "Arab", icon: "mdi-abjad-arabic" },
        {
          value: "latin",
          label: "Latin",
          icon: "mdi-alphabetical-variant"
        }
      ],
      keywordType: null,
      specificSurahs: [],
      specificSurahOptions: surahList,
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
      },
      latinAlternatives,
      latinAlternativeColumns: [
        {
          name: "arabic",
          field: "arabic",
          label: "Huruf Arab",
          align: "center"
        },
        {
          name: "latin",
          field: "latin",
          label: "Huruf Latin",
          align: "center"
        },
        {
          name: "alternative",
          field: "alternative",
          label: "Alternatif",
          align: "center"
        }
      ]
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
    },
    latinKeywordSearch() {
      return this.keywordType?.value === "latin";
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
    filterSpecificSurahOptions(val, update) {
      update(() => {
        const q = val.toLowerCase();
        this.specificSurahOptions = surahList.filter(item => {
          return item.nameSimple.toLowerCase().includes(q);
        });
      });
    },
    saveLastKeyword() {
      LocalStorage.set("search-keyword", this.keywordSearch);
      LocalStorage.set("search-keyword-type", this.keywordType);
      LocalStorage.set("search-specific-surahs", this.specificSurahs);
    },
    getLastKeyword() {
      return LocalStorage.getItem("search-keyword");
    },
    getLastKeywordType() {
      return LocalStorage.getItem("search-keyword-type");
    },
    getLastSpecificSurahs() {
      return LocalStorage.getItem("search-specific-surahs");
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

      const action = this.latinKeywordSearch
        ? "searchByAyahLatin"
        : "searchByAyah";

      this.$store
        .dispatch(`quran/${action}`, {
          keyword: this.keywordSearch,
          page,
          specificSurahs: this.specificSurahs
        })
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
    onOptionClicked(item) {
      this.ayahOptionsDialogData = {
        ayahNumber: item.ayahNumber,
        surahName: item.surahName,
        arabic: item.text,
        translation: item.translation
      };
      this.showAyahOptionsDialog = true;
    }
  },
  mounted() {
    this.track(this.pageTitle);
    this.fitContentHeight();

    if (this.searchResults.length > 0) {
      this.keywordType = this.getLastKeywordType();
      this.specificSurahs = this.getLastSpecificSurahs();
      this.keywordSearch = this.getLastKeyword();
      this.keyword = this.getLastKeyword();
    } else {
      this.keywordType = this.keywordTypeOptions[0]; // Arabic as default
    }

    this.$nextTick(() => {
      window.scrollTo(0, this.getScrollPosition());
      this.init = false;
    });
  }
};
</script>
