import { LocalStorage } from "quasar";

export default function() {
  return {
    surah: null,
    audioReciterId: LocalStorage.getItem("audio-reciter-id") ?? 7, // Default: Mishari Rashid al-`Afasy
    pageScrollPosition: LocalStorage.getItem("page-scroll-position") ?? {},
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
