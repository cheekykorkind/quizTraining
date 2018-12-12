import Vue from "vue";
import Vuex from "vuex";
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      uuid: '',
      name: '',
      administrator: false,
      answerer: false,
      voter: false,
    },
  },
  mutations: {
    ...firebaseMutations,
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {}
});
