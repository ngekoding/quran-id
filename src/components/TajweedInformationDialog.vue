<template>
  <q-dialog
    v-model="showDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="tajweed-information">
      <q-card-section
        ref="tajweedHeader"
        class="row items-center bg-primary text-white"
      >
        <div class="text-h6">Tajwid</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="scroll" :style="tajweedContentStyle">
        <div
          v-for="group in tajweedGroups"
          :key="'group-' + group.name"
          class="tajweed-item row items-stretch no-wrap q-mt-md"
          :class="'tajweed-' + group.name"
        >
          <div class="color-rect">&nbsp;</div>
          <div class="descritpion q-pa-md">
            <div class="text-subtitle1 text-weight-bold">{{ group.color }}</div>
            <p class="text-body2">
              {{ group.color }} mewakili bacaan
              <b>{{ getItemsSimpleStr(group.items) }}</b
              >.
            </p>
            <div
              v-for="item in group.items"
              :key="'group-item-' + item.key"
              class="group-item"
            >
              <div class="text-weight-bold">{{ item.name }}</div>
              <div
                class="text-body2 group-item-description"
                v-html="item.description"
              />
            </div>
          </div>
        </div>
        <div class="q-pa-lg text-body2 text-center text-primary">
          Anda dapat melihat hukum bacaan pada kata atau kalimat tertentu saat
          membaca dengan cara meng-klik pada bagian yang berwarna.
        </div>
        <div class="q-pa-lg text-caption text-center text-grey">
          Penjelasan ini disadur dari buku <b>Metode Asy-Syafi'i</b>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { tajweedGroups } from "src/data/tajweed";
export default {
  name: "TajweedInformationDialog",
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      showDialog: false,
      tajweedGroups,
      headerHeight: 50
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
  computed: {
    tajweedContentStyle() {
      return {
        maxHeight: `calc(100vh - ${this.headerHeight}px)`
      };
    }
  },
  methods: {
    getItemsSimpleStr(items) {
      if (items.length == 1) return items[0].name;
      const simples = items.map(item => item.name);
      const sub = simples.slice(0, -1);
      const last = simples.slice(-1);
      return sub.join(", ") + " dan " + last;
    },
    getTajweedHeaderHeight() {
      const interval = setInterval(() => {
        if (this.$refs.tajweedHeader) {
          this.headerHeight = this.$refs.tajweedHeader.$el.clientHeight;
          clearInterval(interval);
        }
      }, 50);
    }
  },
  mounted() {
    this.getTajweedHeaderHeight();
  }
};
</script>
