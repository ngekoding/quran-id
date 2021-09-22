<template>
  <div class="quran-reader-detail-list-mode">
    <!-- Scroll handler -->
    <page-scroll-position-handler
      :listen="!init && active"
      :page="page"
      :extra="scrollExtra"
      @scroll="position => (activeOffsetTop = position)"
    />
    <!-- Quran reader detail skeleton -->
    <quran-reader-detail-skeleton
      v-if="$store.state.quran.loading.fetchSurah"
    />
    <template v-else>
      <div class="content bg-white" :style="contentStyles">
        <!-- Basmallah -->
        <div
          class="text-basmalah text-center q-py-md"
          style="font-size: 22pt"
          v-if="surah.bismillahPre"
        >
          {{ basmalahArabic }}
        </div>
        <q-list separator>
          <q-item
            v-for="(ayah, index) in surah.ayahs"
            :key="ayah.verse_key"
            class="q-pt-md"
            :ref="ayah.verse_key"
          >
            <q-item-section>
              <q-item-label class="text-arabic text-right">
                {{ ayah.text_uthmani }}
                <span
                  class="text-arabic-number q-mr-xs"
                  v-html="arabicNumber(ayah.verse_number)"
                />
              </q-item-label>
              <q-item-label class="q-pt-sm translation-wrap">
                <span>{{ ayah.verse_number + ". " }}</span>
                <span v-html="surah.translations[index].text" />
              </q-item-label>
              <q-item-label class="q-pt-sm row justify-end">
                <q-btn
                  size="sm"
                  :color="
                    isAyahPlaying(ayah.verse_number) ? 'primary' : 'grey-3'
                  "
                  :text-color="isAyahPlaying(ayah.verse_number) ? '' : 'black'"
                  :icon="
                    isAyahPlaying(ayah.verse_number)
                      ? 'mdi-stop-circle-outline'
                      : 'mdi-motion-play-outline'
                  "
                  round
                  unelevated
                  @click="onAyahPlayClicked(ayah.verse_number)"
                />
                <q-btn
                  size="sm"
                  icon="mdi-dots-vertical-circle-outline"
                  color="grey-3"
                  text-color="black"
                  class="q-ml-sm"
                  round
                  unelevated
                  @click="onOptionClicked(ayah, surah.translations[index])"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </template>

    <!-- Ayah options dialog -->
    <ayah-options-dialog
      :show.sync="showAyahOptionsDialog"
      :ayah-number="ayahOptionsDialogData.ayahNumber"
      :surah-name="ayahOptionsDialogData.surahName"
      :arabic="ayahOptionsDialogData.arabic"
      :translation="ayahOptionsDialogData.translation"
    />

    <!-- Dialog play options -->
    <ayah-play-options-dialog
      :show.sync="showAyahPlayOptionsDialog"
      :ayah-number="ayahPlayOptionsDialogData.ayahNumber"
      @item-click="onAyahPlay"
    />

    <!-- Playing stop -->
    <ayah-play-bottom-control
      :show="player.playing"
      :surah-name="surah.nameSimple"
      :ayah-number="player.currentAyah"
      @stop="stopAudio()"
    />

    <!-- Dialog ayah changer -->
    <q-dialog v-model="showAyahChangerDialog">
      <q-card class="bg-primary" style="width: 80vw">
        <q-card-section class="row items-center text-white">
          <div class="text-h6">Pergi ke ayat</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="bg-white">
          <q-input
            rounded
            outlined
            v-model="ayahChangerKeyword"
            placeholder="Filter nomor ayat..."
            dense
            type="number"
            min="1"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
        <q-list separator class="scroll bg-white" style="max-height: 60vh">
          <q-item v-if="ayahsChangerFiltered.length == 0">
            <q-item-section class="text-center text-grey-6">
              Tidak tersedia
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            v-for="ayah in ayahsChangerFiltered"
            :key="'ayah-changer-' + ayah.verse_key"
            @click="onAyahChange(ayah)"
          >
            <q-item-section>
              Ayat {{ verseNumberFromKey(ayah.verse_key) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

    <!-- Go to top -->
    <to-top v-show="!player.playing" @show="show => (toTopShown = show)" />
    <!--  -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuranReaderDetailSkeleton from "../skeletons/QuranReaderDetailSkeleton.vue";
import AyahOptionsDialog from "src/components/AyahOptionsDialog.vue";
import AyahPlayOptionsDialog from "src/components/AyahPlayOptionsDialog.vue";
import ToTop from "src/components/ToTop.vue";
import PageScrollPositionHandler from "src/components/PageScrollPositionHandler.vue";
import AyahPlayBottomControl from "src/components/AyahPlayBottomControl.vue";

export default {
  name: "QuranDetailListMode",
  components: {
    QuranReaderDetailSkeleton,
    AyahOptionsDialog,
    AyahPlayOptionsDialog,
    ToTop,
    PageScrollPositionHandler,
    AyahPlayBottomControl
  },
  props: {
    surahId: {
      type: Number,
      required: true
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    verseKey: {
      type: String
    },
    headerHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      init: true,
      active: false,
      page: "quran-reader-detail-mode",
      toTopShown: false,
      showAyahChangerDialog: false,
      showSurahChangerDialog: false,
      showAyahOptionsDialog: false,
      ayahOptionsDialogData: {
        ayahNumber: "",
        surahName: "",
        arabic: "",
        translation: ""
      },
      showAyahPlayOptionsDialog: false,
      ayahPlayOptionsDialogData: {
        ayahNumber: 0
      },
      ayahChangerKeyword: null,
      activeOffsetTop: 0,
      player: {
        type: "current-only", // current-only, current-loop, current-and-continue
        audio: null,
        audios: {},
        playing: false,
        currentAyah: 0,
        loop: false
      }
    };
  },
  watch: {
    surahId() {
      this.stopAudio();
      this.player.audios = {};
      this.getSurahDetail();
    },
    showAyahChangerDialog() {
      this.ayahChangerKeyword = null;
    }
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurah"
    }),
    ayahCount() {
      return this.surah?.length;
    },
    scrollExtra() {
      const surahSimple = Object.assign({}, this.surah);
      delete surahSimple.ayahs;
      delete surahSimple.translations;
      return {
        readingMode: false,
        surah: surahSimple
      };
    },
    ayahsChangerFiltered() {
      if (this.ayahChangerKeyword) {
        return this.surah.ayahs.filter(ayah =>
          this.verseNumberFromKey(ayah.verse_key).startsWith(
            this.ayahChangerKeyword
          )
        );
      }
      return this.surah?.ayahs ?? [];
    },
    contentStyles() {
      let paddingBottom = 10;
      if (this.toTopShown) paddingBottom = 64;
      if (this.player.playing) paddingBottom = 74;
      return {
        minHeight: `calc(100vh - ${this.headerHeight}px)`,
        paddingBottom: `${paddingBottom}px`
      };
    }
  },
  methods: {
    getSurahDetail() {
      this.$store.dispatch("quran/fetchSurah", this.surahId).then(_ => {
        this.$nextTick(() => {
          this.init = false;
          window.scrollTo(0, this.offsetTop);
          if (this.verseKey) {
            this.scrollToElement(this.$refs[this.verseKey][0].$el);
          }
        });
      });
    },
    verseNumberFromKey(key) {
      return key.split(":")[1];
    },
    onOptionClicked(arabic, translation) {
      this.ayahOptionsDialogData = {
        surahName: this.surah.nameSimple,
        ayahNumber: translation.verse_number,
        arabic: arabic.text_uthmani,
        translation: translation.text
      };
      this.showAyahOptionsDialog = true;
    },
    onAyahPlayClicked(ayahNumber) {
      if (this.isAyahPlaying(ayahNumber)) {
        this.stopAudio();
      } else {
        this.ayahPlayOptionsDialogData.ayahNumber = ayahNumber;
        this.showAyahPlayOptionsDialog = true;
      }
    },
    prepareAyahChange() {
      this.showAyahChangerDialog = true;
    },
    onAyahChange(ayah) {
      this.showAyahChangerDialog = false;
      this.scrollToElement(this.$refs[ayah.verse_key][0].$el);
    },
    bookmark() {
      this.$q.notify({
        type: "toast-warning",
        message: "Maaf fitur ini belum tersedia."
      });
    },
    isAyahPlaying(ayahNumber) {
      return this.player.playing && this.player.currentAyah == ayahNumber;
    },
    onAyahPlay(type) {
      this.player.type = type;
      this.player.loop = type == "current-loop";
      this.player.currentAyah = this.ayahPlayOptionsDialogData.ayahNumber;

      this.stopAudio();
      this.playAudio();
    },
    getAudioUrl(ayahNumber) {
      const surahFixedLen = this.surahId.toString().padStart(3, "0");
      const ayahFixedLen = ayahNumber.toString().padStart(3, "0");
      return `https://audio.qurancdn.com/Alafasy/mp3/${surahFixedLen}${ayahFixedLen}.mp3`;
    },
    getAudio(ayahNumber) {
      if (this.player.audios.hasOwnProperty(ayahNumber)) {
        return this.player.audios[ayahNumber];
      } else {
        return new Audio(this.getAudioUrl(ayahNumber));
      }
    },
    prepareNextAudio() {
      let endNextAyah = this.player.currentAyah + 2; // This will add one ayah after
      if (endNextAyah > this.surah.versesCount) {
        endNextAyah = this.surah.versesCount;
      }

      for (
        let ayahNumber = this.player.currentAyah + 1;
        ayahNumber <= endNextAyah;
        ayahNumber++
      ) {
        if (!this.player.audios.hasOwnProperty(ayahNumber)) {
          this.$set(
            this.player.audios,
            ayahNumber,
            new Audio(this.getAudioUrl(ayahNumber))
          );
        }
      }
    },
    playAudio() {
      this.player.audio = this.getAudio(this.player.currentAyah);
      this.player.audio.addEventListener("ended", this.onAudioAyahEnded);
      this.player.audio.loop = this.player.loop;
      this.player.audio.play();

      this.player.playing = true;

      // Fetch next ayah file
      // So we don't need wait when playing it
      if (this.player.type == "current-and-continue") {
        this.prepareNextAudio();
      }
    },
    stopAudio() {
      this.player.audio?.pause();
      this.player.playing = false;
    },
    onAudioAyahEnded() {
      if (this.player.type == "current-and-continue") {
        const nextAyah = this.player.currentAyah + 1;
        if (nextAyah <= this.surah.versesCount) {
          // Scroll to next ayah
          const verseKey = this.surahId + ":" + nextAyah;
          this.scrollToElement(this.$refs[verseKey][0].$el);

          this.player.currentAyah = nextAyah;
          this.playAudio();
        } else {
          this.stopAudio();
        }
      } else if (!this.player.loop) {
        this.stopAudio();
      }
    }
  },
  created() {
    this.getSurahDetail();
  },
  activated() {
    this.active = true;
    window.scrollTo(0, this.activeOffsetTop);
  },
  deactivated() {
    this.active = false;
  }
};
</script>
