<template>
  <div class="quran-reader q-pa-md">
    <div class="text-h6">Daftar surat</div>
    <q-list class="bg-white rounded-borders">
      <div v-for="(surah, index) in surahList" :key="surah.id">
        <q-item class="q-py-md">
          <q-item-section side class="items-center" style="width: 40px">
            <div class="text-center">{{ surah.id }}</div>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ surah.surat_name }}</q-item-label>
            <q-item-label caption>{{ surah.count_ayat }} ayat</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label class="text-black text-quran">{{
              surah.surat_text
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator
          v-if="index != surahList.length - 1"
          style="margin-left: 54px"
        />
      </div>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "QuranReader",
  computed: {
    ...mapGetters({
      surahList: "quran/getSurahList"
    })
  },
  created() {
    this.$store.dispatch("quran/fetchSurahList");
  }
};
</script>
