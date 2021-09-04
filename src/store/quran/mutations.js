export function showLoading(state, key) {
  state.loading[key] = true;
}

export function hideLoading(state, key) {
  state.loading[key] = false;
}

export function updateSurahList(state, surahList) {
  state.surahList = surahList;
}

export function updateSurah(state, surah) {
  state.surah = surah;
}

export function updateSurahLastRead(state, surah) {
  state.surahLastRead = surah;
}

export function updateQuranReaderScrollPosition(state, offsetTop) {
  state.quranReaderScrollPosition = offsetTop;
}

export function updateQuranSearchAyahScrollPosition(state, offsetTop) {
  state.searchAyahScrollPosition = offsetTop;
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
