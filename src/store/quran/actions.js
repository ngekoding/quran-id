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

  const pages = Math.ceil(chapter.verses_count / 50);
  const requests = [];
  for (let page = 1; page <= pages; page++) {
    requests.push(
      new Promise((resolve, reject) => {
        this.$httpQuran({
          url: `chapters/${surahId}/verses`,
          params: {
            page,
            limit: 50,
            translations: 33,
            text_type: "image"
          }
        })
          .then(res => {
            resolve(res.data.verses);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
    );
  }

  Promise.all(requests)
    .then(values => {
      let merged = [];
      values.forEach(res => {
        Array.prototype.push.apply(merged, res);
      });
      const lastResult = Object.assign({ ayahs: merged }, chapter);
      context.commit("updateSurah", lastResult);
      context.commit("hideLoading", "fetchSurah");
    })
    .catch(err => {
      console.log(err);
      context.commit("hideLoading", "fetchSurah");
    });
}
