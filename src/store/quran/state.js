import { LocalStorage } from "quasar";

export default function() {
  return {
    surah: null,
    surahLastRead: LocalStorage.getItem("last-read"),
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
      results: [],
      resultTranslations: []
    },
    loading: {
      fetchSurah: false,
      searchAyah: false
    }
  };
}
