import Vue from "vue";
import { LocalStorage } from "quasar";

export function showLoading(state, key) {
  state.loading[key] = true;
}

export function hideLoading(state, key) {
  state.loading[key] = false;
}

export function updateSurah(state, surah) {
  state.surah = surah;
}

export function updateSurahWBW(state, surah) {
  state.surahWBW = surah;
}

export function addSearchAyahResults(state, results) {
  state.searchAyah.results.push(...results);
}

export function addSearchAyahResultsTranslation(state, translation) {
  state.searchAyah.resultTranslations.push(translation);
}

export function resetSearchAyahResults(state) {
  state.searchAyah.results = [];
}

export function resetSearchAyahPaging(state) {
  state.searchAyah.paging = {
    total: 0,
    perPage: 20,
    totalPage: 0,
    currentPage: 1
  };
}

export function updateSearchAyahPaging(state, paging) {
  state.searchAyah.paging = paging;
}

export function setFullMatchSearch(state, value) {
  state.searchAyah.fullMatch = value;
}

export function updatePageScrollPosition(state, info) {
  const { page, offsetTop } = info;
  Vue.set(state.pageScrollPosition, page, {
    offsetTop,
    extra: { ...info?.extra }
  });
  LocalStorage.set("page-scroll-position", state.pageScrollPosition);
}

export function removePageScrollPosition(state, page) {
  Vue.delete(state.pageScrollPosition, page);
  LocalStorage.set("page-scroll-position", state.pageScrollPosition);
}

export function updatePlayerSettings(state, settings) {
  LocalStorage.set("player-settings", settings);
  state.playerSettings = settings;
}

export function setSingglePlayerSettings(state, setting) {
  const { key, value } = setting;
  Vue.set(state.playerSettings, key, value);
  LocalStorage.set("player-settings", state.settings);
}

export function setTajweedMode(state, value) {
  LocalStorage.set("tajweed-mode", value);
  state.tajweedMode = value;
}
