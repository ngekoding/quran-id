<template>
  <div class="quran-reader q-pa-md">
    <!-- Scroll handler -->
    <page-scroll-position-handler :listen="!init" :page="page" />
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
          <div class="text-center">{{ surahLastRead.extra.surah.id }}</div>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{
            surahLastRead.extra.surah.nameSimple
          }}</q-item-label>
          <q-item-label caption>
            {{
              normalizeSurahNameTranslation(
                surahLastRead.extra.surah.nameTranslated
              )
            }}, {{ surahLastRead.extra.surah.versesCount }} ayat
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label class="text-black text-arabic arabic-surah-name">
            {{ surahLastRead.extra.surah.nameArabic }}
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
    <!-- Author information -->
    <footer class="q-pb-md text-center text-body2 text-grey-7">
      Situs atau aplikasi ini dikembangkan dan dikelola oleh
      <a
        href="https://ngekoding.github.io"
        target="_blank"
        class="text-grey-9 text-no-wrap"
        >Nur Muhammad, S.Kom</a
      >, dengan sumber data merujuk pada
      <a
        href="https://quran.api-docs.io"
        target="_blank"
        class="text-grey-9 text-no-wrap"
      >
        API Quran.com
      </a>
    </footer>
  </div>
</template>

<script>
import QuranLogo from "src/components/QuranLogo.vue";
import ToTop from "src/components/ToTop.vue";
import surahList from "src/data/surah-list";
import PageScrollPositionHandler from "src/components/PageScrollPositionHandler.vue";
export default {
  name: "QuranReader",
  components: {
    QuranLogo,
    ToTop,
    PageScrollPositionHandler
  },
  data() {
    return {
      init: true,
      page: "quran-reader",
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
    surahLastRead() {
      return this.getSurahLastRead();
    },
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
    getScrollPosition() {
      return (
        this.$store.getters["quran/getPageScrollPosition"](this.page)
          ?.offsetTop ?? 0
      );
    },
    showSurah(surahId) {
      this.$router.push({ name: "QuranReaderDetail", params: { surahId } });
    },
    getSurahLastRead() {
      return this.$store.getters["quran/getPageScrollPosition"](
        "quran-reader-detail-mode"
      );
    },
    showSurahLastRead() {
      const lastRead = this.getSurahLastRead();
      this.$router.push({
        name: "QuranReaderDetail",
        params: {
          surahId: lastRead.extra.surah.id,
          offsetTop: lastRead.offsetTop,
          activeMode: lastRead.extra.mode,
          activePage: lastRead.extra.currentPage
        }
      });
    },
    clearSurahLastRead() {
      this.$store.dispatch(
        "quran/removePageScrollPosition",
        "quran-reader-detail-mode"
      );
    }
  },
  mounted() {
    this.track(this.productName);
    this.$nextTick(() => {
      window.scrollTo(0, this.getScrollPosition());
      this.init = false;
    });
  }
};
</script>

<style scoped>
footer a {
  text-decoration: none;
}
footer a:hover {
  text-decoration: underline;
}
</style>
