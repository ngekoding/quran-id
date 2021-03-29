import { LocalStorage } from "quasar";

export default function() {
  return {
    surahList: [],
    surah: null,
    surahLastRead: LocalStorage.getItem("surah-last-read"),
    quranReaderScrollPosition: LocalStorage.getItem(
      "surah-list-scroll-position"
    ),
    loading: {
      fetchSurahList: false,
      fetchSurah: false
    }
  };
}
