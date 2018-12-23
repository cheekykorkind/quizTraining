import Vue from "vue";
import Vuex from "vuex";
import { firebaseMutations } from "vuexfire";
import user from "./stores/user";
import question from "./stores/question";
import config from "./stores/config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    ...firebaseMutations
  },
  actions: {},
  getters: {},
  modules: {
    user,
    question,
    config
  }
});
