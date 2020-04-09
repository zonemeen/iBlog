import Vue from "vue";
import Vuex from "vuex";
// import theme from '@/styles/skins.scss'
// console.log(theme,'skin')
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map_user_info: {},
    vuex_skin_obj: {
      name: 'miqilin',
      chinaName: '米淇淋',
      first: 'M',
      icon: 'icon-M',
      behind: 'qilin',
      headerUp: 'out ?',
      headerDown: '未完待续。。。',
      footerUp: 'miqilin',
      footerDown: "I'm here all the time!",
    },
  },
  mutations: {
    map_set_user_info(state, data) {
      state.userInfo = data
    },
    vuex_set_skin_obj(state, data) {
      state.vuex_skin_obj = data
    },
  },
  actions: {},
  modules: {}
});