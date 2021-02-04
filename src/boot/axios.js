import axios from "axios";

const httpQuran = axios.create({
  baseURL: process.env.QURAN_API_BASE_URL,
  headers: {
    "X-Requested-With": "xmlhttprequest"
  }
});

export default ({ store, Vue }) => {
  Vue.prototype.$http = axios;
  store.$http = axios;

  Vue.prototype.$httpQuran = httpQuran;
  store.$httpQuran = httpQuran;
};
