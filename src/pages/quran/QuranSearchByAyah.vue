<template>
  <div class="quran-search-by-ayah">
    <!-- Scroll handler -->
    <q-scroll-observer @scroll="onScroll" />
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
      <div class="q-px-md q-pt-md">
        <div class="row justify-between">
          <q-input
            v-model="keyword"
            type="search"
            placeholder="الحمد"
            input-class="q-px-sm text-right"
            dir="rtl"
            rounded
            outlined
            dense
            clearable
            :dark="false"
            class="col-grow q-mr-sm"
          >
          </q-input>
          <q-btn
            round
            unelevated
            color="primary"
            icon="search"
            @click="onSearch"
          />
        </div>
        <p v-if="keyword" class="text-center q-my-md">
          Ditemukan
          <span class="text-primary">{{ searchPaging.total }}</span> ayat dengan
          kata kunci
          <span class="text-primary">'{{ keyword }}'</span>
        </p>
      </div>
      <q-list v-if="searchResults.length > 0" separator>
        <q-item
          v-for="item in searchResults"
          :key="item.verse_id"
          class="q-pt-md"
          clickable
          @click="showDetail(item)"
        >
          <q-item-section>
            <q-item-label class="text-arabic text-right">
              <span v-html="item.text" />
              <span
                class="text-arabic-number q-mr-xs"
                v-html="arabicNumber(item.ayahNumber)"
              />
            </q-item-label>
            <q-item-label class="q-py-sm translation-wrap">
              <span>QS. {{ `${item.surahName}: ${item.ayahNumber}` }} </span>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LocalStorage } from "quasar";
import QuranSearchResultSkeleton from "./skeletons/QuranSearchResultSkeleton.vue";
export default {
  name: "QuranSearchByAyah",
  components: {
    QuranSearchResultSkeleton
  },
  data() {
    return {
      init: true,
      keyword: "",
      contentStyles: null
    };
  },
  meta() {
    return {
      title: "Pencarian Ayat"
    };
  },
  computed: {
    ...mapGetters({
      searchResults: "quran/getSearchAyahResults",
      searchPaging: "quran/getSearchAyahPaging",
      scrollPosition: "quran/getQuranSearchAyahScrollPosition"
    }),
    isLoadMoreAvailable() {
      return this.searchPaging.currentPage < this.searchPaging.totalPage;
    }
  },
  methods: {
    fitContentHeight() {
      const headerHeight = this.$refs.header.$el.clientHeight + "px";
      this.contentStyles = {
        minHeight: `calc(100vh - ${headerHeight})`
      };
    },
    onScroll(info) {
      if (["up", "down"].includes(info.direction) && !this.init) {
        this.updateScrollPosition(info.position);
      }
    },
    updateScrollPosition(position) {
      this.$store.dispatch("quran/setQuranSearchAyahScrollPosition", {
        offsetTop: position
      });
    },
    saveLastKeyword() {
      LocalStorage.set("search-keyword", this.keyword);
    },
    getLastKeyword() {
      return LocalStorage.getItem("search-keyword");
    },
    onSearch() {
      this.$store.dispatch("quran/resetSearchAyahPaging");
      this.$store.dispatch("quran/resetSearchAyahResults");
      if (this.keyword) this.search();
    },
    search(page) {
      this.saveLastKeyword();
      this.$store
        .dispatch("quran/searchByAyah", { keyword: this.keyword, page })
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
    }
  },
  mounted() {
    this.fitContentHeight();
    this.$nextTick(() => {
      window.scrollTo(0, this.scrollPosition);
      this.init = false;
    });
  },
  created() {
    if (this.searchResults.length > 0) {
      this.keyword = this.getLastKeyword();
    }
  }
};
</script>
