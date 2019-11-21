// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router/index.js";
import store from "./store/index.js";
import App from "./App";
import "./icons/index.js";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.less";
import storage from "./utils/setStorage";
import "./router/permission.js";
import { plugin as CacheTagData } from "./mixins/CacheTagData";

Vue.use(Element, { size: "medium" });

Vue.config.productionTip = false;
Vue.prototype.$storage = storage;
Vue.use(CacheTagData);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  render: h => h(App)
});
