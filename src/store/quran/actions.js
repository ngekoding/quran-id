export function fetchSurahList(context) {
  const surahList = require("assets/quran/quran-list-kemenag.json");
  context.commit("updateSurahList", surahList.data);
}
