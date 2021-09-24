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
      v-if="surah"
      :show="player.playing"
      :surah-name="surah.nameSimple"
      :ayah-number="player.currentAyah"
      @stop="stopAudio()"
    />

    <!-- Dialog ayah changer -->
    <ayah-changer-dialog
      v-if="surah"
      :show.sync="showAyahChangerDialog"
      :surah-id="surahId"
      :verses-count="surah.versesCount"
      @item-click="onAyahChange"
    />

    <!-- Go to top -->
    <to-top v-show="!player.playing" @show="show => (toTopShown = show)" />
    <!--  -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuranReaderDetailSkeleton from "../skeletons/QuranReaderDetailSkeleton.vue";
import AyahOptionsDialog from "src/components/AyahOptionsDialog.vue";
import AyahChangerDialog from "src/components/AyahChangerDialog.vue";
import AyahPlayOptionsDialog from "src/components/AyahPlayOptionsDialog.vue";
import AyahPlayBottomControl from "src/components/AyahPlayBottomControl.vue";
import ToTop from "src/components/ToTop.vue";
import PageScrollPositionHandler from "src/components/PageScrollPositionHandler.vue";
import reciterList from "src/data/reciter-list";

export default {
  name: "QuranDetailListMode",
  components: {
    QuranReaderDetailSkeleton,
    AyahOptionsDialog,
    AyahChangerDialog,
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
      activeOffsetTop: 0,
      reciterList,
      player: {
        type: "current-only", // current-only, current-loop, current-and-continue
        audio: null,
        audios: {},
        playing: false,
        currentAyah: 0,
        ayahStartFrom: 0,
        loopCounter: 0
      }
    };
  },
  watch: {
    surahId() {
      this.stopAudio();
      this.player.audios = {};
      this.getSurahDetail();
    },
    audioReciterId() {
      this.player.audios = {};
    }
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurah",
      playerSettings: "quran/getPlayerSettings"
    }),
    audioReciterId() {
      return this.playerSettings?.audioReciterId ?? 7;
    },
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
    onAyahChange(verseKey) {
      this.showAyahChangerDialog = false;
      this.scrollToElement(this.$refs[verseKey][0].$el);
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
      this.player.loopCounter = 0;
      this.player.currentAyah = this.ayahPlayOptionsDialogData.ayahNumber;
      this.player.ayahStartFrom = this.ayahPlayOptionsDialogData.ayahNumber;

      this.stopAudio();
      this.playAudio();
    },
    getAudioUrl(ayahNumber) {
      const surahFixedLen = this.surahId.toString().padStart(3, "0");
      const ayahFixedLen = ayahNumber.toString().padStart(3, "0");
      const urlPrefix = reciterList.find(r => r.id == this.audioReciterId)
        .audioUrlPrefix;

      return urlPrefix + surahFixedLen + ayahFixedLen + ".mp3";
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
      this.player.audio.play();

      this.player.playing = true;

      // Fetch next ayah file
      // So we don't need wait when playing it
      if (this.player.type == "current-and-continue") {
        this.prepareNextAudio();
      }
    },
    stopAudio() {
      if (this.player.audio) {
        this.player.audio.pause();
        this.player.audio.currentTime = 0;
      }
      this.player.playing = false;
    },
    onAudioAyahEnded() {
      if (this.player.type == "current-loop") {
        this.player.loopCounter++;
        console.log("counter", this.player.loopCounter);
        console.log("max", this.playerSettings.singleRepeatNumber);
        if (this.player.loopCounter < this.playerSettings.singleRepeatNumber) {
          this.playAudio();
        } else {
          this.stopAudio();
        }
      } else if (this.player.type.startsWith("current-and-continue")) {
        const nextAyah = this.player.currentAyah + 1;
        if (nextAyah <= this.surah.versesCount) {
          // Scroll to next ayah
          const verseKey = this.surahId + ":" + nextAyah;
          this.scrollToElement(this.$refs[verseKey][0].$el);

          this.player.currentAyah = nextAyah;
          this.playAudio();
        } else if (this.player.type.endsWith("loop")) {
          this.player.loopCounter++;
          if (
            this.player.loopCounter < this.playerSettings.continuedRepeatNumber
          ) {
            const verseKey = this.surahId + ":" + this.player.ayahStartFrom;
            this.scrollToElement(this.$refs[verseKey][0].$el);

            this.player.currentAyah = this.player.ayahStartFrom;
            this.playAudio();
          } else {
            this.stopAudio();
          }
        } else {
          this.stopAudio();
        }
      } else {
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
