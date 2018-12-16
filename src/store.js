import Vue from "vue";
import Vuex from "vuex";
import user from "./stores/user";
import question from "./stores/question";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    user,
    question
  }
});
