import Vue from "vue";
import Router from "vue-router";
import VoterLogin from "./views/voter/Login.vue";
import VoterTop from "./views/voter/Top.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/voter/login",
      name: "VoterLogin",
      component: VoterLogin
    },
    {
      path: "/voter/top",
      name: "VoterTop",
      component: VoterTop
    }
  ]
});
