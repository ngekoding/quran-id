import { LocalStorage } from "quasar";

export default function() {
  return {
    surahList: [],
    surah: null,
    surahLastRead: LocalStorage.getItem("surah-last-read"),
    quranReaderScrollPosition: LocalStorage.getItem(
      "surah-list-scroll-position"
    ),
    searchAyahScrollPosition: LocalStorage.getItem(
      "search-ayah-scroll-position"
    ),
    searchAyah: {
      fullMatch: false,
      paging: {
        total: 0,
        perPage: 20,
        currentPage: 1,
        totalPage: 0
      },
      results: []
    },
    loading: {
      fetchSurahList: false,
      fetchSurah: false,
      searchAyah: false
    }
  };
}
