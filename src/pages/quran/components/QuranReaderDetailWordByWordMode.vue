<template>
  <div class="quran-reader-detail-word-by-word-mode">
    <!-- Scroll handler -->
    <page-scroll-position-handler
      :listen="!init && active"
      :page="page"
      :extra="scrollExtra"
      @scroll="onPageScroll"
    />
    <!-- Quran reader detail skeleton -->
    <quran-reader-detail-skeleton
      v-if="$store.state.quran.loading.fetchSurahWBW"
    />
    <template v-else>
      <div class="content bg-white" :style="contentStyles">
        <!-- Basmallah -->
        <div v-if="surah.bismillahPre" class="basmalah" />
        <q-list separator>
          <q-infinite-scroll ref="ayahScroll" @load="onLoadMore" :offset="300">
            <q-item
              v-for="ayah in loadedAyahs"
              :key="ayah.verse_key"
              class="q-pt-md"
              :ref="ayah.verse_key"
            >
              <q-item-section>
                <q-item-label class="text-arabic text-right">
                  <span
                    v-for="(word, wordIndex) in ayah.words.slice(0, -1)"
                    :key="'wbw-' + word.id"
                    class="wbw-wrap q-pl-md q-mb-md"
                  >
                    <span>
                      <span class="wbw-arabic" v-html="word.text_uthmani" />
                      <!-- Show ayah number at the end of words -->
                      <span
                        v-if="wordIndex == ayah.words.length - 2"
                        class="text-arabic-number q-mr-sm"
                        v-html="arabicNumber(ayah.verse_number)"
                      />
                    </span>
                    <span class="wbw-translation">
                      {{ word.translation.text }}
                    </span>
                  </span>
                </q-item-label>
                <q-item-label class="q-pt-sm row justify-end">
                  <q-btn
                    size="sm"
                    :color="
                      isAyahPlaying(ayah.verse_number) ? 'primary' : 'grey-3'
                    "
                    :text-color="
                      isAyahPlaying(ayah.verse_number) ? '' : 'black'
                    "
                    :icon="
                      isAyahPlaying(ayah.verse_number)
                        ? 'mdi-stop-circle-outline'
                        : 'mdi-motion-play-outline'
                    "
                    round
                    unelevated
                    @click="onAyahPlayClicked(ayah.verse_number)"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-list>
      </div>
    </template>

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
      :title="ayahPlayBottomControlTitle"
      :caption="surah.nameSimple + ': ' + player.currentAyah"
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
import AyahChangerDialog from "src/components/AyahChangerDialog.vue";
import AyahPlayOptionsDialog from "src/components/AyahPlayOptionsDialog.vue";
import AyahPlayBottomControl from "src/components/AyahPlayBottomControl.vue";

import ToTop from "src/components/ToTop.vue";
import PageScrollPositionHandler from "src/components/PageScrollPositionHandler.vue";

import reciterList from "src/data/reciter-list";

import Player from "src/lib/player";
import { EventBus } from "src/lib/event-bus";

export default {
  name: "QuranDetailListMode",
  components: {
    QuranReaderDetailSkeleton,
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
      loadedAyahs: [],
      showAyahChangerDialog: false,
      showSurahChangerDialog: false,
      showAyahPlayOptionsDialog: false,
      ayahPlayOptionsDialogData: {
        ayahNumber: 0
      },
      activeOffsetTop: 0,
      reciterList,
      player: {
        player: null,
        type: "current-only", // current-only, current-loop, current-and-continue
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
      this.resetLoadMore();
      this.getSurahDetail();
    },
    audioReciterId() {
      this.setupPlayer();
    }
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurahWBW",
      playerSettings: "quran/getPlayerSettings"
    }),
    audioReciterId() {
      return this.playerSettings?.audioReciterId ?? 7;
    },
    audioReciter() {
      return this.reciterList.find(r => r.id == this.audioReciterId);
    },
    ayahPlayBottomControlTitle() {
      return (
        this.audioReciter.reciterName +
        (this.audioReciter.style ? ` (${this.audioReciter.style})` : "")
      );
    },
    scrollExtra() {
      const surahSimple = Object.assign({}, this.surah);
      delete surahSimple.ayahs;
      delete surahSimple.translations;
      return {
        mode: "wbw",
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
      this.$store.dispatch("quran/fetchSurahWBW", this.surahId).then(_ => {
        // Load first 10 ayahs or last available ayah if defined
        const firstLoadNumber = Math.min(
          this.verseKey ? parseInt(this.verseKey.split(":")[1]) : 10,
          this.surah.ayahs.length
        );

        this.loadedAyahs = [];
        for (let i = 0; i < firstLoadNumber; i++) {
          this.loadedAyahs.push(this.surah.ayahs[i]);
        }

        this.$nextTick(() => {
          this.init = false;
          window.scrollTo(0, this.offsetTop);
          if (this.verseKey) {
            this.scrollToElement(this.$refs[this.verseKey][0].$el);
          }
        });

        this.setupPlayer();
        this.setupPlayerListener();
      });
    },
    resetLoadMore() {
      this.$refs.ayahScroll?.stop();
      this.loadedAyahs = [];
    },
    onLoadMore(index, done) {
      const ayahLength = this.surah.ayahs.length;
      const loadedLength = this.loadedAyahs.length;

      // All ayah already loaded
      if (loadedLength == ayahLength) {
        this.$refs.ayahScroll.stop();
        return;
      }

      const loadEndIndex = Math.min(loadedLength + 10, ayahLength);
      for (let i = loadedLength; i < loadEndIndex; i++) {
        this.loadedAyahs.push(this.surah.ayahs[i]);
      }

      done();
    },
    onPageScroll(position) {
      this.activeOffsetTop = position;
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

      // Make sure the destination ayah is loaded
      const loadedLength = this.loadedAyahs.length;
      const ayahNumber = parseInt(verseKey.split(":")[1]);
      if (loadedLength < ayahNumber) {
        for (let i = loadedLength; i < ayahNumber; i++) {
          this.loadedAyahs.push(this.surah.ayahs[i]);
        }
      }

      this.$nextTick(() => {
        this.scrollToElement(this.$refs[verseKey][0].$el);
      });
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
      const urlPrefix = this.audioReciter.audioUrlPrefix;

      return urlPrefix + surahFixedLen + ayahFixedLen + ".mp3";
    },
    playAudio() {
      const trackIndex = this.player.currentAyah - 1;
      this.player.player.play(trackIndex);
      this.player.playing = true;
    },
    stopAudio() {
      if (this.player.playing) {
        this.player.player.stop();
        this.player.playing = false;
      }
    },
    onAudioAyahEnded() {
      if (this.player.type == "current-loop") {
        this.player.loopCounter++;
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
    },
    setupPlayer() {
      const playlist = [];
      for (
        let ayahNumber = 1;
        ayahNumber <= this.surah.versesCount;
        ayahNumber++
      ) {
        playlist.push({
          src: this.getAudioUrl(ayahNumber)
        });
      }
      this.player.player = new Player(playlist);
    },
    setupPlayerListener() {
      EventBus.$on("player:end", this.onAudioAyahEnded);
    }
  },
  created() {
    this.getSurahDetail();
  },
  mounted() {},
  activated() {
    this.active = true;
    window.scrollTo(0, this.activeOffsetTop);
  },
  deactivated() {
    this.active = false;
  }
};
</script>
