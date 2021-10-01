import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 0,
});

const httpQuran = axios.create({
  adapter: cache.adapter,
  baseURL: process.env.QURAN_API_BASE_URL,
  headers: {
    "X-Requested-With": "xmlhttprequest",
  },
});

export default ({ store, app }) => {
  app.config.globalProperties.$http = axios;
  store.$http = axios;

  app.config.globalProperties.$httpQuran = httpQuran;
  store.$httpQuran = httpQuran;
};
