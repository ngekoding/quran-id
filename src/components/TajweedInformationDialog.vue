<template>
  <q-dialog
    v-model="showDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="tajweed-information">
      <q-card-section ref="tajweedHeader" class="row items-center">
        <div class="text-h6">Tajwid</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <div class="scroll q-pt-sm" :style="tajweedContentStyle">
        <div
          v-for="group in tajweedGroups"
          :key="'group-' + group.name"
          class="tajweed-item row items-stretch no-wrap"
          :class="'tajweed-' + group.name"
        >
          <!-- <div class="color-rect">&nbsp;</div> -->
          <div class="col-grow descritpion q-px-md q-pt-sm q-pb-md">
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
              <div
                class="group-item-example q-mt-md row"
                :class="'example-' + item.key"
              >
                <div
                  class="col-grow q-mr-sm text-arabic"
                  v-html="item.example.arabic"
                />
                <q-btn
                  color="primary"
                  icon="mdi-motion-play"
                  flat
                  rounded
                  dense
                  @click="playExample(item.example.meta.verseKey)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="q-px-lg q-py-md text-body2 text-center text-primary">
          Anda dapat melihat hukum bacaan pada kata atau kalimat tertentu saat
          membaca dengan cara mengklik pada bagian yang berwarna.
        </div>
        <div
          class="q-px-lg q-pb-lg text-caption text-center text-grey"
          style="line-height: 15px"
        >
          Penjelasan ini disadur dari<br />
          <b>Buku Metode Asy-Syafi'i - Kelas Tajwid</b>
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
      headerHeight: 50,
      audio: null
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
    },
    playExample(verseKey) {
      const [surahId, ayahNumber] = verseKey.split(":");
      const surahFixedLen = surahId.padStart(3, "0");
      const ayahFixedLen = ayahNumber.padStart(3, "0");
      const urlPrefix = "https://everyayah.com/data/Ayman_Sowaid_64kbps/";

      const audioUrl = urlPrefix + surahFixedLen + ayahFixedLen + ".mp3";

      // Stop previous audio if exists
      if (this.audio) this.audio.pause();

      this.audio = new Audio(audioUrl);
      this.audio.play();
    }
  },
  mounted() {
    this.getTajweedHeaderHeight();
  }
};
</script>
