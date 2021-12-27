<template>
  <div class="quran-reader-detail-list-mode">
    <!-- Scroll handler -->
    <page-scroll-position-handler
      :listen="!init && active"
      :page="page"
      :extra="scrollExtra"
      @scroll="onPageScroll"
    />
    <!-- Quran reader detail skeleton -->
    <quran-reader-detail-skeleton
      v-if="$store.state.quran.loading.fetchSurah"
    />
    <template v-else>
      <!-- Tajweed tooltip -->
      <div
        v-show="tajweedMode && tajweedTooltip.show"
        ref="tajweedTooltip"
        :class="[
          'tajweed-tooltip',
          tajweedTooltip.horizontal,
          tajweedTooltip.name
        ]"
        :style="tajweedTooltipStyle"
      >
        {{ tajweedTooltip.content }}
      </div>
      <div class="content bg-white" :style="contentStyles">
        <!-- Basmallah -->
        <div v-if="surah.bismillahPre" class="basmalah" />
        <q-list separator>
          <q-item
            v-for="(ayah, index) in surah.ayahs"
            :key="ayah.verse_key"
            class="q-pt-md"
            :ref="ayah.verse_key"
          >
            <q-item-section>
              <q-item-label class="text-arabic text-right">
                <span v-html="ayah.text_uthmani" />
                <span
                  class="text-arabic-number q-mr-sm"
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
import AyahOptionsDialog from "src/components/AyahOptionsDialog.vue";
import AyahChangerDialog from "src/components/AyahChangerDialog.vue";
import AyahPlayOptionsDialog from "src/components/AyahPlayOptionsDialog.vue";
import AyahPlayBottomControl from "src/components/AyahPlayBottomControl.vue";

import ToTop from "src/components/ToTop.vue";
import PageScrollPositionHandler from "src/components/PageScrollPositionHandler.vue";

import reciterList from "src/data/reciter-list";
import tajweedList from "src/data/tajweed";

import Player from "src/lib/player";
import { EventBus } from "src/lib/event-bus";

import "tapjs";

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
      tajweedList,
      player: {
        player: null,
        type: "current-only", // current-only, current-loop, current-and-continue
        playing: false,
        currentAyah: 0,
        ayahStartFrom: 0,
        loopCounter: 0
      },
      showTajwidDialog: false,
      tajweedTooltip: {
        show: false,
        name: "",
        content: "Content Here",
        horizontal: "",
        top: 0,
        left: 0,
        right: 0
      },
      playerNew: null
    };
  },
  watch: {
    surahId() {
      this.stopAudio();
      this.getSurahDetail();
    },
    audioReciterId() {
      this.setupPlayer();
    },
    tajweedMode(val) {
      if (val) this.setTajweedListener();
      else this.removeTajweedListener();

      this.tajweedTooltip.show = false;
      this.getSurahDetail();
    }
  },
  computed: {
    ...mapGetters({
      surah: "quran/getSurah",
      playerSettings: "quran/getPlayerSettings",
      tajweedMode: "quran/getTajweedMode"
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
        mode: "list",
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
    },
    tajweedTooltipStyle() {
      const left =
        typeof this.tajweedTooltip.left == "number"
          ? this.tajweedTooltip.left + "px"
          : this.tajweedTooltip.left;
      const right =
        typeof this.tajweedTooltip.right == "number"
          ? this.tajweedTooltip.right + "px"
          : this.tajweedTooltip.right;
      return {
        top: this.tajweedTooltip.top - 35 + "px",
        left,
        right
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

        this.setupPlayer();
        this.setupPlayerListener();
      });
    },
    onPageScroll(position) {
      this.activeOffsetTop = position;
      this.tajweedTooltip.show = false;
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
    handleWindowResize(e) {
      this.tajweedTooltip.show = false;
    },
    handleReaderDetailTap(e) {
      this.tajweedTooltip.show = false;

      const tagName = e.target.tagName.toLowerCase();
      const tagClass = e.target.className;
      const tagRects = e.target.getClientRects();
      const tagRect = tagRects[0];
      const windowWidth = window.innerWidth;
      const handledTajweed = this.tajweedList.find(
        item => item.key == tagClass
      );

      if (tagName == "tajweed" && handledTajweed) {
        e.preventDefault();
        e.stopPropagation();

        this.tajweedTooltip.content = handledTajweed.name;
        this.tajweedTooltip.top = tagRect.top;
        this.tajweedTooltip.left = tagRect.left;
        this.tajweedTooltip.right = "auto";
        this.tajweedTooltip.name = tagClass;
        this.tajweedTooltip.show = true;

        // Calculating x position after content changed
        this.$nextTick(() => {
          const tooltip = this.$refs.tajweedTooltip;
          const tooltipRect = tooltip.getBoundingClientRect();
          const left = tagRect.left - tooltipRect.width / 2 + tagRect.width / 2;
          const right = left + tooltipRect.width;

          if (left > 1 && right < windowWidth - 1) {
            this.tajweedTooltip.left = left;
            this.tajweedTooltip.right = "auto";
            this.tajweedTooltip.horizontal = "";
          } else if (left <= 1) {
            this.tajweedTooltip.horizontal = "left";
            this.tajweedTooltip.left = tagRect.left;
            this.tajweedTooltip.right = "auto";
          } else if (right >= windowWidth - 1) {
            this.tajweedTooltip.horizontal = "right";
            this.tajweedTooltip.right = windowWidth - tagRect.right;
            this.tajweedTooltip.left = "auto";
          }
        });
      }
    },
    setTajweedListener() {
      window.addEventListener("resize", this.handleWindowResize);
      document
        .querySelector(".quran-reader-detail-list-mode")
        .addEventListener("tap", this.handleReaderDetailTap);
    },
    removeTajweedListener() {
      window.removeEventListener("resize", this.handleWindowResize);
      document
        .querySelector(".quran-reader-detail-list-mode")
        .removeEventListener("tap", this.handleReaderDetailTap);
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
  mounted() {
    if (this.tajweedMode) this.setTajweedListener();
  },
  activated() {
    this.active = true;
    window.scrollTo(0, this.activeOffsetTop);
  },
  deactivated() {
    this.active = false;
  },
  beforeDestroy() {
    this.removeTajweedListener();
  }
};
</script>
