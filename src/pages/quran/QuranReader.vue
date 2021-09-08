<template>
  <div class="quran-reader q-pa-md">
    <!-- Scroll handler -->
    <q-scroll-observer @scroll="onScroll" />
    <!-- Quran Logo -->
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
          <q-item-label>{{ surahLastRead.nameSimple }}</q-item-label>
          <q-item-label caption>
            {{ normalizeSurahNameTranslation(surahLastRead.nameTranslated) }},
            {{ surahLastRead.versesCount }} ayat
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-black text-arabic arabic-surah-name">
            {{ surahLastRead.nameArabic }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <!-- Surah list -->
    <div class="row items-center justify-between q-mb-xs">
      <div class="text-h6">Surah</div>
      <q-btn
        :icon="showSurahFilter ? 'search_off' : 'search'"
        flat
        dense
        round
        @click="showSurahFilter = !showSurahFilter"
      />
    </div>
    <q-list separator class="bg-white rounded-borders q-mb-lg">
      <q-item v-if="showSurahFilter" class="q-pt-md">
        <q-item-section>
          <q-input
            ref="surahFilterInput"
            v-model="surahFilter"
            type="search"
            placeholder="Cari nama surah..."
            input-class="q-px-sm"
            rounded
            outlined
            dense
            clearable
            :dark="false"
          />
          <div class="row justify-center q-pt-sm">
            <q-btn
              flat
              rounded
              color="primary"
              label="Pencarian Ayat"
              @click="$router.push({ name: 'QuranSearchByAyah' })"
            />
          </div>
        </q-item-section>
      </q-item>
      <q-item
        v-if="surahListFiltered.length == 0 && surahFilter"
        class="q-py-lg"
      >
        <q-item-section class="column items-center">
          <q-icon name="blur_on" size="60px" class="text-grey-8" />
          <p class="text-center text-body1 text-grey-7 q-mt-md">
            Nama surah tidak ditemukan.
          </p>
        </q-item-section>
      </q-item>
      <div v-for="(surah, index) in surahListFiltered" :key="surah.id">
        <q-item class="q-py-md" clickable v-ripple @click="showSurah(surah.id)">
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
        <q-separator
          v-if="index != surahListFiltered.length - 1"
          style="margin-left: 54px"
        />
      </div>
    </q-list>
    <!-- Go to top -->
    <to-top />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuranLogo from "src/components/QuranLogo.vue";
import ToTop from "src/components/ToTop.vue";
import surahList from "src/data/surah-list";
export default {
  name: "QuranReader",
  components: {
    QuranLogo,
    ToTop
  },
  data() {
    return {
      init: true,
      surahList: surahList,
      surahFilter: "",
      showSurahFilter: false
    };
  },
  watch: {
    showSurahFilter(val) {
      this.surahFilter = "";
      if (val) {
        this.$nextTick(() => {
          this.$refs.surahFilterInput.focus();
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      surahLastRead: "quran/getSurahLastRead",
      scrollPosition: "quran/getQuranReaderScrollPosition"
    }),
    surahListFiltered() {
      if (this.surahFilter && this.showSurahFilter) {
        const q = this.surahFilter.toLowerCase();
        return this.surahList.filter(s => {
          return (
            s.nameSimple.toLowerCase().includes(q) ||
            s.nameArabic.toLowerCase().includes(q) ||
            s.nameTranslated.toLowerCase().includes(q)
          );
        });
      }
      return this.surahList ?? [];
    }
  },
  methods: {
    onScroll(info) {
      if (["up", "down"].includes(info.direction) && !this.init) {
        this.updateScrollPosition(info.position);
      }
    },
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
    },
    updateScrollPosition(position) {
      this.$store.dispatch("quran/setQuranReaderScrollPosition", {
        offsetTop: position
      });
    }
  },
  mounted() {
    this.track(this.productName);
    this.$nextTick(() => {
      window.scrollTo(0, this.scrollPosition);
      this.init = false;
    });
  }
};
</script>
