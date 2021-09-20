<template>
  <q-scroll-observer @scroll="onScroll" />
</template>

<script>
export default {
  name: "PageScrollPositionHandler",
  props: {
    listen: {
      type: Boolean
    },
    page: {
      type: String,
      required: true
    },
    extra: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onScroll(info) {
      if (["up", "down"].includes(info.direction) && this.listen) {
        this.$emit("scroll", info.position);
        this.$store.dispatch("quran/setPageScrollPosition", {
          page: this.page,
          offsetTop: info.position,
          extra: this.extra
        });
      }
    }
  }
};
</script>
