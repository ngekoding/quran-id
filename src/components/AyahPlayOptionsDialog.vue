<template>
  <!-- Dialog options -->
  <q-dialog v-model="showDialog" v-if="showDialog">
    <q-card class="bg-primary" style="width: 80vw">
      <q-card-section class="row items-center text-white">
        <div class="text-h6">Ayat {{ ayahNumber }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-list separator class="bg-white">
        <q-item clickable v-ripple @click="play('current-only')">
          <q-item-section>
            Dengarkan ayat ini
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="play('current-loop')">
          <q-item-section>
            Dengarkan ayat ini berulang
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="play('current-and-continue')">
          <q-item-section>
            Dengarkan mulai dari ayat ini
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="play('current-and-continue-loop')">
          <q-item-section>
            Dengarkan mulai dari ayat ini berulang
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "AyahPlayOptionsDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    ayahNumber: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      showDialog: false
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.showDialog = val;
      }
    },
    showDialog(val) {
      this.$emit("update:show", val);
    }
  },
  methods: {
    play(type) {
      this.showDialog = false;
      this.$emit("item-click", type);
    }
  }
};
</script>
