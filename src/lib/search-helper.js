/**
 * I wrote this function which handles strings with mixed Arabic and English characters,
 * removing special characters (including diacritics) and normalizing
 * some Arabic characters like converting all ة's into ه's.
 * Soruce: https://stackoverflow.com/a/40959537/6829171
 */
const normalizeText = function(text) {
  //remove special characters
  text = text.replace(
    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
    ""
  );

  //normalize Arabic
  text = text.replace(/(آ|إ|أ)/g, "ا");
  text = text.replace(/(ة)/g, "ه");
  text = text.replace(/(ئ|ؤ)/g, "ء");
  text = text.replace(/(ى)/g, "ي");

  //convert arabic numerals to english counterparts.
  const starter = 0x660;
  for (let i = 0; i < 10; i++) {
    text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
  }

  return text;
};

const filterFullMatchSearchResults = function(results, q) {
  const qNormalized = normalizeText(q);
  const regex = new RegExp(qNormalized, "g");
  return results.filter(ayah => {
    const ayahNormalized = normalizeText(ayah.text);
    return ayahNormalized.search(regex) !== -1;
  });
};

export { normalizeText, filterFullMatchSearchResults };

export default filterFullMatchSearchResults;
