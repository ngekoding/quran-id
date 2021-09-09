import { LocalStorage } from "quasar";

export default function() {
  return {
    surah: null,
    pageScrollPosition: LocalStorage.getItem("page-scroll-position") ?? {},
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
