<template>
  <div class="to-top">
    <q-scroll-observer @scroll="onScroll" />
    <!-- Go to top button -->
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-btn
        v-if="show"
        class="fixed-bottom-right q-mr-md q-mb-md"
        color="primary"
        icon="expand_less"
        fab-mini
        @click="toTop()"
      />
    </transition>
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
