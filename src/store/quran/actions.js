import { LocalStorage } from "quasar";

export function fetchSurahList(context) {
  context.commit("showLoading", "fetchSurahList");
  return new Promise((resolve, reject) => {
    this.$httpQuran({
      url: "chapters",
      params: {
        language: "id"
      }
    })
      .then(res => {
        context.commit("updateSurahList", res.data.chapters);
        context.commit("hideLoading", "fetchSurahList");
        resolve(res);
      })
      .catch(err => {
        context.commit("hideLoading", "fetchSurahList");
        reject(err);
      });
  });
}

export async function fetchSurah(context, surahId) {
  context.commit("showLoading", "fetchSurah");

  // Getting chapter for versesCount
  const chapter = await this.$httpQuran({
    url: `chapters/${surahId}`,
    params: {
      language: "id"
    }
  })
    .then(res => res.data.chapter)
    .catch(err => console.log(err));

  const urls = [
    {
      url: "quran/verses/uthmani",
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
      const arabics = values[0].verses;
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

export function setSurahLastRead(context, { surah, offsetTop }) {
  const surahLastRead = Object.assign({ offsetTop }, surah);
  LocalStorage.set("surah-last-read", surahLastRead);
  context.commit("updateSurahLastRead", surahLastRead);
}

export function removeSurahLastRead(context) {
  LocalStorage.remove("surah-last-read");
  context.commit("updateSurahLastRead", null);
}
