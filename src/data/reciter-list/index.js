import reciterListByApi from "./reciter-list-by-api";
import reciterListExtras from "./extras";

const reciterList = [...reciterListByApi, ...reciterListExtras].sort((a, b) => {
  const nameA = a.reciterName.toUpperCase();
  const nameB = b.reciterName.toUpperCase();

  if (nameA > nameB) return 1;
  else if (nameA < nameB) return -1;
  return 0;
});

export default reciterList;
