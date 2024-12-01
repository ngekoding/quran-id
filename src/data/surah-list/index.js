import surahListByApi from "./surah-list-by-api";
import surahListKemenag from "./surah-list-kemenag";
import surahListCorrections from "./corrections";
import createFuzzySearch from "@nozbe/microfuzz";
import { normalizeLatinText } from "src/lib/search-helper";

const surahList = [];

surahListByApi.forEach(item => {
  const kemenag = surahListKemenag[item.id] ?? null;
  const correction = surahListCorrections[item.id] ?? null;

  surahList.push({
    id: item.id,
    versesCount: item.verses_count,
    bismillahPre: item.bismillah_pre,
    nameArabic: correction?.nameArabic ?? kemenag?.nameArabic,
    nameSimple: correction?.nameSimple ?? kemenag?.nameSimple,
    nameTranslated: correction?.nameTranslated ?? kemenag?.nameTranslated,
    pages: item.pages
  });
});

const getFilteredSurahList = keyword => {
  if (!keyword) {
    return surahList;
  }

  const q = normalizeLatinText(keyword);
  const fuzzySearch = createFuzzySearch(surahList, {
    getText: item => [item.nameSimple, item.nameArabic, item.nameTranslated]
  });

  const filtered = fuzzySearch(q).map(item => {
    return {
      ...item.item
    };
  });

  // Keep order
  filtered.sort((a, b) => a.id - b.id);

  return filtered;
};

export { surahList, getFilteredSurahList };

export default surahList;
