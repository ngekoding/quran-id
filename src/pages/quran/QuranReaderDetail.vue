<template>
  <div class="quran-reader-detail">
    <quran-reader-detail-skeleton
      v-if="$store.state.quran.loading.fetchSurah"
    />
    <template v-else>
      <q-item class="q-py-sm q-px-sm">
        <q-item-section side>
          <q-btn icon="arrow_back" round flat @click="$router.go(-1)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ surah.name_simple }}</q-item-label>
          <q-item-label caption>{{ surah.translated_name.name }}</q-item-label>
        </q-item-section>
      </q-item>
      <div class="content bg-white">
        <!-- Basmallah -->
        <div
          class="text-arabic text-center q-py-md"
          style="font-size: 16pt"
          v-if="surah.bismillah_pre"
        >
          {{ basmallahArabic }}
        </div>
        <q-list>
          <div v-for="(ayah, index) in surah.ayahs" :key="ayah.verse_number">
            <q-item class="q-py-md">
              <q-item-section>
                <q-item-label class="text-arabic text-right">{{
                  ayah.text_madani
                }}</q-item-label>
                <q-item-label class="q-pt-sm"
                  >{{ ayah.verse_number }}.
                  {{ ayah.translations[0].text }}</q-item-label
                >
              </q-item-section>
              <q-item-section side top class="q-mt-sm">
                {{ arabicNumber(ayah.verse_number) }}
              </q-item-section>
            </q-item>
            <q-separator
              v-if="index != surah.ayahs.length - 1"
              color="grey-3"
            />
          </div>
        </q-list>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { toArabic } from "arabic-digits";
import QuranReaderDetailSkeleton from "./skeletons/QuranReaderDetailSkeleton.vue";
export default {
  name: "QuranReaderDetail",
  components: {
    QuranReaderDetailSkeleton
  },
  data() {
    return {
      basmallahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
    };
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurah"
    })
  },
  methods: {
    arabicNumber(number) {
      return toArabic(number);
    }
  },
  created() {
    this.$store.dispatch("quran/fetchSurah", this.$route.params.surahId);
  }
};
</script>
