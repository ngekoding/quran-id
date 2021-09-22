<template>
  <q-page-sticky position="bottom" expand>
    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <q-card v-if="show" style="width: 100%" flat square>
        <q-separator />
        <q-card-section
          class="row items-center no-wrap q-px-md q-py-xs"
          horizontal
        >
          <div class="q-ml-sm">
            <div class="text-grey">Anda sedang mendengarkan</div>
            <div class="text-weight-bold">
              QS. {{ surahName }}: {{ ayahNumber }}
            </div>
          </div>
          <q-space />
          <q-btn
            size="lg"
            flat
            round
            icon="mdi-stop-circle-outline"
            @click="stop()"
          />
        </q-card-section>
      </q-card>
    </transition>
  </q-page-sticky>
</template>

<script>
export default {
  name: "AyahPlayBottomControl",
  props: {
    show: {
      type: Boolean
    },
    surahName: {
      type: String,
      required: true
    },
    ayahNumber: {
      type: Number,
      required: true
    }
  },
  methods: {
    stop() {
      this.$emit("stop");
    }
  }
};
</script>
