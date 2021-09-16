<template>
  <div class="quran-reading-mode bg-white">
    <swiper
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
    pages: {
      type: Array,
      required: true
    },
    headerHeight: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {},
      pageCount: 0,
      currentPage: this.pages[0],
      images: []
    };
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
      // Load three first images
      let endPage = this.pages[0] + 2;
      endPage = endPage > this.pages[1] ? this.pages[1] : endPage;
      for (let page = this.pages[0]; page <= endPage; page++) {
        this.images.push({
          page,
          url: `quran-images/${page}.png`
        });
      }
    },
    loadMore() {
      const nextPage = this.images.slice(-1)[0].page + 1;
      if (nextPage <= this.pages[1]) {
        this.images.push({
          page: nextPage,
          url: `quran-images/${nextPage}.png`
        });
      }
    },
    onNext() {
      this.loadMore();
      this.currentPage++;
    },
    onPrev() {
      this.currentPage--;
    }
  },
  mounted() {
    this.pageCount = this.pages[1] - this.pages[0] + 1;
    this.init();
  }
};
</script>

<style></style>
