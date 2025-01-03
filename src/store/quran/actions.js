import {
  filterFullMatchSearchResults,
  normalizeLatinText
} from "src/lib/search-helper";
import surahList from "src/data/surah-list";
import createFuzzySearch from "@nozbe/microfuzz";

export async function fetchSurah(context, surahId) {
  context.commit("showLoading", "fetchSurah");

  const chapter = surahList.find(item => item.id == surahId);
  const tajweedMode = context.state.tajweedMode;

  const urls = [
    {
      url: "quran/verses/uthmani" + (tajweedMode ? "_tajweed" : ""),
      params: {
        chapter_number: surahId
      }
    },
    {
      url: "quran/translations/33",
      params: {
        chapter_number: surahId,
        fields: "verse_number"
      }
    }
  ];

  const requests = [];
  urls.forEach(url => {
    requests.push(
      new Promise((resolve, reject) => {
        this.$httpQuran({
          url: url.url,
          params: url.params
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
    );
  });

  return Promise.all(requests)
    .then(values => {
      const arabics = values[0].verses.map(verse => {
        let text_uthmani;

        /**
         * Special cases for tajweed
         * - Remove verse number (end) & fix spacing
         * - Fix some madda_normal weird character
         */
        if (tajweedMode) {
          text_uthmani = verse.text_uthmani_tajweed
            .replace(/<span.*?>.*?<\/span>/gi, "")
            .replace("ٲ", String.fromCharCode(1648))
            .trim();
        } else {
          text_uthmani = verse.text_uthmani.trim();
        }

        return {
          ...verse,
          text_uthmani,
          verse_number: parseInt(verse.verse_key.split(":")[1])
        };
      });
      const translations = values[1].translations;
      const merged = Object.assign({ ayahs: arabics, translations }, chapter);
      context.commit("updateSurah", merged);
      context.commit("hideLoading", "fetchSurah");
    })
    .catch(err => {
      console.log(err);
      context.commit("hideLoading", "fetchSurah");
    });
}

export async function fetchSurahWBW(context, surahId) {
  context.commit("showLoading", "fetchSurahWBW");

  const chapter = surahList.find(item => item.id == surahId);

  // We can only fetch 50 ayah per request
  const perPage = 50;
  const requestCount = Math.ceil(chapter.versesCount / perPage);
  const urls = [];
  for (let page = 1; page <= requestCount; page++) {
    urls.push({
      url: "verses/by_chapter/" + surahId,
      params: {
        language: "id",
        words: true,
        word_fields: "text_uthmani",
        page: page,
        per_page: perPage
      }
    });
  }

  const requests = [];
  urls.forEach(url => {
    requests.push(
      new Promise((resolve, reject) => {
        this.$httpQuran({
          url: url.url,
          params: url.params
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
    );
  });

  return Promise.all(requests)
    .then(values => {
      const verses = values.reduce((acc, res) => acc.concat(res.verses), []);
      const merged = Object.assign({ ayahs: verses }, chapter);
      context.commit("updateSurahWBW", merged);
      context.commit("hideLoading", "fetchSurahWBW");
    })
    .catch(err => {
      console.log(err);
      context.commit("hideLoading", "fetchSurahWBW");
    });
}

export async function searchByAyah(
  context,
  { keyword, page = 1, specificSurahs = [] }
) {
  context.commit("showLoading", "searchAyah");

  const perPage = context.state.searchAyah.paging.perPage;

  return new Promise(async (resolve, reject) => {
    this.$httpQuran({
      url: "search",
      params: {
        query: keyword,
        size: perPage,
        page: page
      }
    })
      .then(async res => {
        if (res.status == 204) {
          context.commit("hideLoading", "searchAyah");
          resolve({
            results: []
          });
          return;
        }

        const data = res.data.search;
        const paging = {
          total: data.total_results,
          perPage: perPage,
          totalPage: data.total_pages,
          currentPage: page
        };

        let results = data.results;

        if (specificSurahs.length) {
          results = results.filter(item => {
            const surahId = parseInt(item.verse_key.split(":")[0]);
            return specificSurahs.includes(surahId);
          });
        }

        // Filtering full match keyword
        if (context.state.searchAyah.fullMatch) {
          results = filterFullMatchSearchResults(results, keyword);

          // Loop until found any data
          if (results.length == 0 && page < paging.totalPage) {
            context.dispatch("searchByAyah", { keyword, page: page + 1 });
            return;
          }
        }

        const fetchTranslation = async verseKey => {
          const response = await this.$httpQuran({
            url: "quran/translations/33",
            params: { verse_key: verseKey }
          });
          return response.data.translations[0].text;
        };

        // Add surah name, ayah number & translation
        // And keep only used properties
        results = await Promise.all(
          results.map(async item => {
            const [surahId, ayahNumber] = item.verse_key.split(":");
            const surah = surahList.find(s => s.id == surahId);

            const translation = await fetchTranslation(item.verse_key);

            return {
              verseKey: item.verse_key,
              text: item.text,
              surahId: parseInt(surahId),
              surahName: surah.nameSimple,
              ayahNumber: parseInt(ayahNumber),
              translation
            };
          })
        );

        // Sort by surah and ayah number
        results.sort((a, b) => {
          if (a.surahId != b.surahId) {
            return a.surahId - b.surahId;
          }
          return a.ayahNumber - b.ayahNumber;
        });

        context.commit("updateSearchAyahPaging", paging);
        context.commit("addSearchAyahResults", results);
        context.commit("hideLoading", "searchAyah");
        resolve({
          results,
          paging
        });
      })
      .catch(err => {
        context.commit("hideLoading", "searchAyah");
        reject(err);
      });
  });
}

export async function searchByAyahLatin(
  context,
  { keyword, page = 1, specificSurahs = [] }
) {
  context.commit("showLoading", "searchAyah");

  const perPage = context.state.searchAyah.paging.perPage;

  return new Promise(async (resolve, reject) => {
    // Only fetch the data once
    if (page === 1) {
      try {
        let data = await this.$http
          .get(`${document.baseURI}quran-latin.json`)
          .then(res => res.data);

        // Filter the result for specific surahs
        if (specificSurahs.length) {
          data = data.filter(item => {
            return specificSurahs.includes(item.surahId);
          });
        }

        const normalizedKeyword = normalizeLatinText(keyword);
        const strategy = context.state.searchAyah.fullMatch ? "off" : "smart";

        const fuzzySearch = createFuzzySearch(data, {
          key: "latin",
          strategy
        });

        const filtered = fuzzySearch(normalizedKeyword);

        context.commit("updateSearchAyahResultsLatinAll", filtered);
      } catch (err) {
        reject(err);
      }
    }

    // Simply read the results from the store
    const resultsAll = context.state.searchAyah.resultsLatinAll;

    const paging = {
      total: resultsAll.length,
      perPage: perPage,
      totalPage: Math.ceil(resultsAll.length / perPage),
      currentPage: page
    };

    // Get the only data for the current page
    let results = resultsAll.slice((page - 1) * perPage, page * perPage);

    // Add arab text and translation
    const fetchAyahWithTranslation = async verseKey => {
      const response = await this.$httpQuran({
        url: "verses/by_key/" + verseKey,
        params: {
          words: false,
          translations: 33,
          fields: "text_uthmani"
        }
      });

      const verse = response.data.verse;

      return {
        text: verse.text_uthmani,
        translation: verse.translations[0].text
      };
    };

    results = await Promise.all(
      results.map(async itemRaw => {
        const item = itemRaw.item;
        const verseKey = `${item.surahId}:${item.ayahNumber}`;
        const surah = surahList.find(s => s.id == item.surahId);

        const ayah = await fetchAyahWithTranslation(verseKey);

        return {
          verseKey,
          surahId: parseInt(item.surahId),
          surahName: surah.nameSimple,
          ayahNumber: parseInt(item.ayahNumber),
          text: ayah.text,
          translation: ayah.translation
        };
      })
    );

    // Sort by surah and ayah number
    results.sort((a, b) => {
      if (a.surahId != b.surahId) {
        return a.surahId - b.surahId;
      }
      return a.ayahNumber - b.ayahNumber;
    });

    context.commit("updateSearchAyahPaging", paging);
    context.commit("addSearchAyahResults", results);
    context.commit("hideLoading", "searchAyah");
    resolve({
      results,
      paging
    });
  });
}

export function resetSearchAyahResults(context) {
  context.commit("resetSearchAyahResults");
}

export function resetSearchAyahPaging(context) {
  context.commit("resetSearchAyahPaging");
}

export function setFullMatchSearch(context, value) {
  context.commit("setFullMatchSearch", value);
}

export function setPageScrollPosition(context, info) {
  context.commit("updatePageScrollPosition", info);
}

export function removePageScrollPosition(context, page) {
  context.commit("removePageScrollPosition", page);
}

export function updatePlayerSettings(context, settings) {
  context.commit("updatePlayerSettings", settings);
}

export function setSinglePlayerSettings(context, setting) {
  context.commit("setSinglePlayerSettings", setting);
}

export function setTajweedMode(context, value) {
  context.commit("setTajweedMode", value);
}
