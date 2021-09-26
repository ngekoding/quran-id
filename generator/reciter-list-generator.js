const axios = require("axios");
const fs = require("fs-extra");

const url = "https://api.quran.com/api/v4/resources/recitations";

(async () => {
  const response = await axios.get(url);
  const reciterList = response.data.recitations;
  const reciterListFinal = [];

  for (let i = 0; i < reciterList.length; i++) {
    const reciter = reciterList[i];
    console.log(
      "Generating for:",
      reciter.reciter_name + ` (${reciter.style})`
    );

    const audioUrlResponse = await axios.get(
      `https://api.quran.com/api/v4/recitations/${reciter.id}/by_ayah/1:1`
    );

    const audioUrl = audioUrlResponse.data.audio_files[0].url;
    const audioUrlPrefix = audioUrl.substring(0, audioUrl.lastIndexOf("/") + 1);
    const domain = audioUrl.startsWith("//")
      ? ""
      : "https://audio.qurancdn.com/";

    reciterListFinal.push({
      id: reciter.id,
      reciterName: reciter.reciter_name,
      style: reciter.style,
      audioUrlPrefix: domain + audioUrlPrefix
    });
  }

  // Write to json file
  const filePath = "./../src/data/reciter-list/reciter-list-by-api.js";
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, JSON.stringify(reciterListFinal, null, "\t"));

  console.log(reciterListFinal);
})();
