<template>
  <div class="to-top">
    <q-scroll-observer @scroll="onScroll" />
    <!-- Go to top button -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      style="z-index: 10"
    >
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-btn
          v-if="show"
          color="primary"
          icon="expand_less"
          fab-mini
          @click="toTop()"
        />
      </transition>
    </q-page-sticky>
  </div>
</template>

<script>
export default {
  name: "ToTop",
  data() {
    return {
      show: false
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.$emit("show", val);
      }
    }
  },
  methods: {
    onScroll(info) {
      if (info.position > 900) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    toTop() {
      const el = document.getElementsByTagName("body")[0];
      this.scrollToElement(el);
    }
  }
};
</script>
