import VueGtag from "vue-gtag";

export default async ({ Vue }) => {
  Vue.use(VueGtag, {
    config: { id: "G-3RT9MGB5RR" },
    enabled: process.env.GTAG_ENABLED
  });
};
