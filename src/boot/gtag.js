import VueGtag from "vue-gtag-next";

export default async ({ app }) => {
  app.use(VueGtag, {
    config: { id: "G-3RT9MGB5RR" },
    enabled: process.env.GTAG_ENABLED
  });
};
