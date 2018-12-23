import Vue from "vue";
import Vuex from "vuex";
import { firebaseMutations } from "vuexfire";
import user from "./stores/user";
import question from "./stores/question";
import questionMaster from "./stores/questionMaster";

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
    questionMaster
  }
});
