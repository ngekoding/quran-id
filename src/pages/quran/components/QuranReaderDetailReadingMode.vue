<template>
  <div class="quran-reading-mode bg-white">
    <swiper
      :key="swiperKey"
      ref="quranPageSwiper"
      :options="swiperOptions"
      dir="rtl"
      @slideNextTransitionEnd="onNext"
      @slidePrevTransitionEnd="onPrev"
    >
      <swiper-slide v-for="image in images" :key="`page-${image.page}`">
        <q-img :src="image.url" :style="imageStyle" contain />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "QuranDetailReadingMode",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    surah: {
      type: Object,
      required: true
    },
    pages: {
      type: Array,
      required: true
    },
    headerHeight: {
      type: Number,
      default: 0
    },
    activePage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      page: "quran-reader-detail-mode",
      swiperKey: 1,
      swiperOptions: {},
      pageCount: 0,
      currentPage: this.pages[0],
      quranImageBaseUrl: "https://android.quran.com/data/width_1024/page",
      images: []
    };
  },
  watch: {
    pages(val) {
      this.swiperOptions.initialSlide = 0;
      this.swiperKey = !this.swiperKey;

      this.currentPage = val[0];
      this.init();
    },
    currentPage: "saveScrollPosition"
  },
  computed: {
    swiper() {
      return this.$refs.quranPageSwiper.$swiper;
    },
    imageStyle() {
      return {
        height: `calc(100vh - ${this.headerHeight}px - 10px)`,
        marginTop: "10px"
      };
    }
  },
  methods: {
    init() {
      this.images = [];
      this.pageCount = this.pages[1] - this.pages[0] + 1;

      // Load three first images
      let endPage = this.currentPage + 2;

      endPage = endPage > this.pages[1] ? this.pages[1] : endPage;
      for (let page = this.pages[0]; page <= endPage; page++) {
        this.images.push({
          page,
          url:
            this.quranImageBaseUrl + page.toString().padStart(3, "0") + ".png"
        });
      }
    },
    loadMore() {
      const nextPage = this.images.slice(-1)[0].page + 1;
      if (nextPage <= this.pages[1]) {
        this.images.push({
          page: nextPage,
          url:
            this.quranImageBaseUrl +
            nextPage.toString().padStart(3, "0") +
            ".png"
        });
      }
    },
    onNext() {
      this.loadMore();
      this.currentPage++;
    },
    onPrev() {
      this.currentPage--;
    },
    saveScrollPosition() {
      this.$store.dispatch("quran/setPageScrollPosition", {
        page: this.page,
        offsetTop: 0,
        extra: {
          mode: "reading",
          surah: this.surah,
          currentPage: this.currentPage
        }
      });
    }
  },
  mounted() {
    if (this.activePage != 0) {
      const activePageIndex = this.activePage - this.pages[0];
      this.swiperOptions.initialSlide = activePageIndex;
      this.currentPage = this.activePage;
      this.swiperKey = !this.swiperKey;
    }

    this.init();
  },
  activated() {
    this.saveScrollPosition();
  }
};
</script>
