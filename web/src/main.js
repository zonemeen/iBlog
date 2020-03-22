import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

import "./assets/scss/style.scss";
import "./assets/iconfont/iconfont.css";

import axios from "axios";
Vue.prototype.$http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/web/api'
  baseURL: "http://localhost:3000/web/api"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");