import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueInsProgressBar from 'vue-ins-progress-bar'
import "./assets/scss/style.scss";
import "./assets/iconfont/iconfont.css";
import "./plugins/filters";
import "./plugins/global";
import http from "./http";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

const options = {
  position: 'fixed',
  show: true,
  height: '3px'
}

Vue.use(VueInsProgressBar, options)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");