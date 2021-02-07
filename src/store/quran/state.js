import { LocalStorage } from "quasar";

export default function() {
  return {
    surahList: [],
    surah: null,
    surahLastRead: LocalStorage.getItem("surah-last-read"),
    loading: {
      fetchSurahList: false,
      fetchSurah: false
    }
  };
}
