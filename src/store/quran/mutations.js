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
