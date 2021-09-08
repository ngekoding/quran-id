const axios = require("axios");
const fs = require("fs-extra");

const url = "https://api.quran.com/api/v4/chapters?language=id";

(async () => {
  const response = await axios.get(url);
  const surahList = response.data.chapters;

  // Write to json file
  const filePath = "./../src/data/surah-list/surah-list-by-api.js";
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, JSON.stringify(surahList, null, "\t"));

  console.log(surahList);
})();
