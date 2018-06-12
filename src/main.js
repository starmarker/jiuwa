// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import Zj from "@npmprivate/vue-zjlibrary";
import api_lists from "./libs/api_config";
import notice from "./libs/notice";
import Vant from "vant";
import "vant/lib/vant-css/index.css";
import apis from "./libs/api_config";
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.use(Zj, {
  api_lists,
  notices: notice,
  wxtoken: "MDAwMDAwMDAwMLW60Ks"
});
/* eslint-disable no-new */
// require("./libs/mock");
Vue.prototype.getQueryString = function(name) {
  let reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|#|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
const vm = new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
window.vm = vm;
