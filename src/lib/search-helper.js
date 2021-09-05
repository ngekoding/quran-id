/**
 * I wrote this function which handles strings with mixed Arabic and English characters,
 * removing special characters (including diacritics) and normalizing
 * some Arabic characters like converting all ة's into ه's.
 * Source: https://stackoverflow.com/a/40959537/6829171
 *
 * Edited by Nur Muhammad
 * I make some modifications to fix some mistakes
 */
const normalizeText = function(text) {
  text = text.replace(/(آ|إ|أ|ٱ|ٲ|ٳ)/g, "ا");
  text = text.replace(/(ئ|ؤ)/g, "ء");
  text = text.replace(/(ى)/g, "ي");

  // Remove special characters
  text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669])/g, "");

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
