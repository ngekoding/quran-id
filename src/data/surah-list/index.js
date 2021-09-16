import surahListByApi from "./surah-list-by-api";
import surahListCorrections from "./corrections";

const surahList = [];

surahListByApi.forEach(item => {
  const correction = surahListCorrections[item.id] ?? null;
  surahList.push({
    id: item.id,
    versesCount: item.verses_count,
    bismillahPre: item.bismillah_pre,
    nameArabic: correction?.nameArabic ?? item.name_arabic,
    nameSimple: correction?.nameSimple ?? item.name_simple,
    nameTranslated: correction?.nameTranslated ?? item.translated_name.name,
    pages: item.pages
  });
});

export default surahList;
