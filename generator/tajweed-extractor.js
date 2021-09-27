/**
 * We need to find the types of tajweed
 * This will extracting from all of surah
 */
const axios = require("axios");
const fs = require("fs-extra");

const baseUrl = "https://api.quran.com/api/v4/quran/verses/uthmani_tajweed";

const surahStart = 1;
const surahEnd = 114;

const getSurah = async chapterNumber => {
  return await axios
    .get(baseUrl, {
      params: {
        chapter_number: chapterNumber
      }
    })
    .then(res => res.data.verses)
    .catch(err => {
      console.log("Error getting surah: ", chapterNumber, err);
      return [];
    });
};

const tajweedClassRegEx = /<tajweed class=(.*?)>/gi;
const tajweeds = [];

(async () => {
  for (let i = surahStart; i <= surahEnd; i++) {
    const verses = await getSurah(i);
    verses.forEach(verse => {
      while ((matchs = tajweedClassRegEx.exec(verse.text_uthmani_tajweed))) {
        if (!tajweeds.includes(matchs[1])) {
          console.log(matchs[1]);
          console.log(verse, "\n");

          tajweeds.push(matchs[1]);
        }
      }
    });
  }
  console.log(tajweeds);
})();
