import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import VoterVote from "./views/voter/Vote";
import VoterTeam from "./views/voter/Team";
import AnswererAnswer from "./views/answerer/Answer";
import AdministratorQuizes from "./views/administrator/Quizes";
import AdministratorQuiz from "./views/administrator/Quiz";
import AdministratorQuizScreen from "./views/administrator/QuizScreen";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/voter/vote",
      name: "VoterVote",
      component: VoterVote,
      meta: { requireAuth: true },
    },
    {
      path: "/voter/team",
      name: "VoterTeam",
      component: VoterTeam,
      meta: { requireAuth: true },
    },
    {
      path: "/answerer/answer",
      name: "AnswererAnswer",
      component: AnswererAnswer,
      meta: { requireAuth: true },
    },
    {
      path: "/administrator/quizes",
      name: "AdministratorQuizes",
      component: AdministratorQuizes,
      meta: { requireAuth: true },
    },
    {
      path: "/administrator/quizes/1",
      name: "AdministratorQuiz",
      component: AdministratorQuiz,
      meta: { requireAuth: true },
    },
    {
      path: "/administrator/quizes/1/screen",
      name: "AdministratorQuizScreen",
      component: AdministratorQuizScreen,
      meta: { requireAuth: true },
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    firebase.auth().onAuthStateChanged(function (user) {
     user ? next() : next({ path: '/login', query: { redirect: to.fullPath } });
    })
  } else {
    next();
  }
})

export default router;
