import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./style.css";
import './plugins/filters'

Vue.config.productionTip = false;
Vue.use(ElementUI);

import http from "./http";
Vue.prototype.$http = http;
import MTopHandle from './components/MTopHandle'
Vue.component('MTopHandle', MTopHandle)
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`
      };
    }
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");