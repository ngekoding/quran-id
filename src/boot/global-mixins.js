import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default ({ Vue }) => {
  Vue.mixin({
    data() {
      return {
        basmalahArabic: "﷽"
      };
    },
    methods: {
      removeFootNote(str) {
        const regExp = /<sup\s+foot_note=\d+>\d+<\/sup>/gi;
        return str.replaceAll(regExp, "");
      },
      scrollToElement(el, offsetCorrection = -66) {
        // 66 is toolbar height
        const target = getScrollTarget(el);
        const offset = el.offsetTop + offsetCorrection;
        const duration = 1000;
        setScrollPosition(target, offset, duration);
      },
      normalizeSurahNameTranslation(str) {
        return str.replace(/\\/g, "");
      }
    }
  });
};
