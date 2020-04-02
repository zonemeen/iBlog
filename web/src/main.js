import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import './assets/css/style-liberxue.css'
// import './assets/css/xcode.min.css'

Vue.use(ElementUI);

Vue.config.productionTip = false;

import "./assets/scss/style.scss";
import "./assets/iconfont/iconfont.css";
import './common/filters'
import http from './http'

Vue.prototype.$http = http

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");