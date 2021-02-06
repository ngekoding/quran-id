export default ({ Vue }) => {
  Vue.mixin({
    methods: {
      removeFootNote(str) {
        const regExp = /<sup\s+foot_note=\d+>\d+<\/sup>/gi;
        return str.replaceAll(regExp, "");
      }
    }
  });
};
