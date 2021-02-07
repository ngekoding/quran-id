<template>
  <div class="quran-reader q-pa-md">
    <quran-logo />
    <!-- Last reading -->
    <q-card v-if="surahLastRead" class="bg-white rounded-borders q-mb-md" flat>
      <div class="row items-center justify-between q-pt-sm">
        <q-item-label class="q-pa-none q-pl-md" header>
          Terakhir dibaca
        </q-item-label>
        <q-btn
          icon="cancel"
          size="sm"
          class="text-grey-6 q-mr-sm"
          dense
          round
          flat
          @click="clearSurahLastRead()"
        />
      </div>
      <q-item class="q-py-md" clickable v-ripple @click="showSurahLastRead()">
        <q-item-section side class="items-center" style="width: 40px">
          <div class="text-center">{{ surahLastRead.id }}</div>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ surahLastRead.name_simple }}</q-item-label>
          <q-item-label caption>
            {{ surahLastRead.translated_name.name }},
            {{ surahLastRead.verses_count }} ayat
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-black text-arabic">
            {{ surahLastRead.name_arabic }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <!-- Surah list -->
    <div class="row items-center justify-between q-mb-xs">
      <div class="text-h6">Surah</div>
      <q-btn icon="search" round flat dense size="md" />
    </div>
    <quran-reader-skeleton v-if="$store.state.quran.loading.fetchSurahList" />
    <q-list v-else class="bg-white rounded-borders">
      <div v-for="(surah, index) in surahList" :key="surah.id">
        <q-item class="q-py-md" clickable v-ripple @click="showSurah(surah.id)">
          <q-item-section side class="items-center" style="width: 40px">
            <div class="text-center">{{ surah.id }}</div>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ surah.name_simple }}</q-item-label>
            <q-item-label caption>
              {{ surah.translated_name.name }}, {{ surah.verses_count }} ayat
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label class="text-black text-arabic">
              {{ surah.name_arabic }}
            </q-item-label>
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
import QuranLogo from "src/components/QuranLogo.vue";
import QuranReaderSkeleton from "./skeletons/QuranReaderSkeleton.vue";
export default {
  name: "QuranReader",
  components: {
    QuranLogo,
    QuranReaderSkeleton
  },
  computed: {
    ...mapGetters({
      surahList: "quran/getSurahList",
      surahLastRead: "quran/getSurahLastRead"
    })
  },
  methods: {
    showSurah(surahId) {
      this.$router.push({ name: "QuranReaderDetail", params: { surahId } });
    },
    showSurahLastRead() {
      this.$router.push({
        name: "QuranReaderDetail",
        params: {
          surahId: this.surahLastRead.id,
          offsetTop: this.surahLastRead.offsetTop
        }
      });
    },
    clearSurahLastRead() {
      this.$store.dispatch("quran/removeSurahLastRead");
    }
  },
  created() {
    this.$store.dispatch("quran/fetchSurahList");
  }
};
</script>
