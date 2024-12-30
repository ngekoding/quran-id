<template>
  <div class="quran-reading-mode bg-white">
    <swiper
      ref="quranPageSwiper"
      :options="swiperOptions"
      dir="rtl"
      @slideChange="onSlideChange"
    />
  </div>
</template>

<script>
import { Swiper } from "vue-awesome-swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "QuranDetailReadingMode",
  components: {
    Swiper
  },
  props: {
    surah: {
      type: Object,
      required: true
    },
    headerHeight: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      page: "quran-reader-detail-mode",
      pagesCount: 604,
      quranImageBaseUrl: "https://android.quran.com/data/width_1024/page",
      initial: false
    };
  },
  watch: {
    "surah.id": "init"
  },
  computed: {
    swiper() {
      return this.$refs.quranPageSwiper.$swiper;
    },
    swiperOptions() {
      return {
        dir: "rtl",
        slidesPerView: 1,
        virtual: {
          slides: (() => {
            const slides = [];
            for (let page = 1; page <= this.pagesCount; page++) {
              slides.push(
                `<img
                  src="${this.getImageUrl(page)}"
                  style="${this.imageStyle}"
                />`
              );
            }
            return slides;
          })()
        }
      };
    },
    imageStyle() {
      return `height: calc(100vh - ${this.headerHeight}px - 20px)`;
    }
  },
  methods: {
    getImageUrl(page) {
      return this.quranImageBaseUrl + page.toString().padStart(3, "0") + ".png";
    },
    init() {
      this.initial = true;
      const initialPage = this.currentPage || this.surah.pages[0];
      this.swiper.slideTo(initialPage - 1, 0);
      this.$nextTick(() => {
        this.swiper.virtual.update();
        this.initial = false;
        this.saveScrollPosition();
      });
    },
    onSlideChange() {
      if (this.initial) return;
      this.$emit("update:currentPage", this.swiper.activeIndex + 1);
      this.$nextTick(() => {
        this.saveScrollPosition();
      });
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
  activated() {
    this.init();
  }
};
</script>

<style lang="scss">
.swiper-slide {
  text-align: center;
  img {
    width: 100%;
    margin-top: 10px;
    object-fit: contain;
    object-position: top center;
  }
}
</style>
