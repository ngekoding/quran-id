<template>
  <q-dialog v-model="showDialog">
    <q-card class="bg-primary" style="width: 80vw">
      <q-card-section class="row items-center text-white">
        <div class="text-h6">Surah</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="bg-white">
        <q-input
          rounded
          outlined
          v-model="keyword"
          placeholder="Filter surah..."
          dense
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-list separator class="scroll bg-white" style="max-height: 60vh">
        <q-item v-if="surahListFiltered.length == 0">
          <q-item-section class="text-center text-grey-6">
            Tidak tersedia
          </q-item-section>
        </q-item>
        <q-item
          v-for="surah in surahListFiltered"
          :key="surah.id"
          :ref="'surah-changer-' + surah.id"
          :class="['q-py-md', { 'bg-blue-1': surah.id == activeSurahId }]"
          clickable
          v-ripple
          @click="showSurah(surah.id)"
        >
          <q-item-section side class="items-center" style="width: 40px">
            <div class="text-center">{{ surah.id }}</div>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ surah.nameSimple }}</q-item-label>
            <q-item-label caption>
              {{ normalizeSurahNameTranslation(surah.nameTranslated) }},
              {{ surah.versesCount }} ayat
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label class="text-black text-arabic arabic-surah-name">
              {{ surah.nameArabic }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
import surahList from "src/data/surah-list";
export default {
  name: "SurahChangerDialog",
  props: {
    show: {
      type: Boolean
    },
    activeSurahId: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      surahList: surahList,
      showDialog: false,
      keyword: ""
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.showDialog = val;
        this.keyword = "";
        this.$nextTick(() => {
          if (val && this.activeSurahId) {
            const el = this.$refs["surah-changer-" + this.activeSurahId][0].$el;
            this.scrollToElement(el, -138, 0);
          }
        });
      }
    },
    showDialog(val) {
      this.$emit("update:show", val);
    }
  },
  computed: {
    surahListFiltered() {
      if (this.keyword) {
        const q = this.keyword.toLowerCase();
        return this.surahList.filter(s => {
          return (
            s.nameSimple.toLowerCase().includes(q) ||
            s.nameArabic.toLowerCase().includes(q) ||
            s.nameTranslated.toLowerCase().includes(q)
          );
        });
      }
      return this.surahList;
    }
  },
  methods: {
    showSurah(id) {
      this.$emit("item-click", id);
    }
  }
};
</script>
