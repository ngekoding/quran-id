export function getSurah(state) {
  return state.surah;
}

export function getSurahLastRead(state) {
  return state.surahLastRead;
}

export function getQuranReaderScrollPosition(state) {
  return state.quranReaderScrollPosition;
}

export function getQuranSearchAyahScrollPosition(state) {
  return state.searchAyahScrollPosition;
}

export function getSearchAyahResults(state) {
  return state.searchAyah.results;
}

export function getSearchAyahResultTranslations(state) {
  return state.searchAyah.resultTranslations;
}

export function getSearchAyahPaging(state) {
  return state.searchAyah.paging;
}
