import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import PermissionError from "./views/PermissionError";
import VoterVote from "./views/voter/Vote";
import Team from "./views/Team";
import Schedule from "./views/Schedule";
import AnswererAnswer from "./views/answerer/Answer";
import AdministratorInputPoints from "./views/administrator/InputPoints";
import AdministratorSelectPlayer from "./views/administrator/SelectPlayer";
import AdministratorSelectQuestion from "./views/administrator/SelectQuestion";
import AdministratorSetQuestionStatus from "./views/administrator/SetQuestionStatus";
import AdministratorScreen from "./views/administrator/Screen";
import AdministratorSelectAnswerer from "./views/administrator/SelectAnswerer";

import AdministratorQuestion from "./views/administrator/Question";
import AdministratorQuestionScreen from "./views/administrator/QuestionScreen";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/team",
      name: "Team",
      component: Team,
      meta: { requireAuth: true }
    },
    {
      path: "/Schedule",
      name: "Schedule",
      component: Schedule,
      meta: { requireAuth: true }
    },
    {
      path: "/permission-error",
      name: "PermissionError",
      component: PermissionError
    },
    //-----------------------------------------------------------
    // administrator
    {
      path: "/administrator/inputPoints",
      name: "AdministratorInputPoints",
      component: AdministratorInputPoints,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/selectPlayer",
      name: "AdministratorSelectPlayer",
      component: AdministratorSelectPlayer,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/selectQuestion",
      name: "AdministratorSelectQuestion",
      component: AdministratorSelectQuestion,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/setQuestionStatus",
      name: "AdministratorSetQuestionStatus",
      component: AdministratorSetQuestionStatus,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/screen",
      name: "AdministratorScreen",
      component: AdministratorScreen,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/selectAnswerer",
      name: "AdministratorSelectAnswerer",
      component: AdministratorSelectAnswerer,
      meta: { requireAuth: true }
    },
    // {
    //   path: "/administrator/questions",
    //   name: "AdministratorQuestions",
    //   component: AdministratorQuestions,
    //   meta: { requireAuth: true }
    // },
    {
      path: "/administrator/questions/1",
      name: "AdministratorQuestion",
      component: AdministratorQuestion,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/questions/1/screen",
      name: "AdministratorQuestionScreen",
      component: AdministratorQuestionScreen,
      meta: { requireAuth: true }
    },
    //-----------------------------------------------------------
    // answerer
    {
      path: "/answerer/answer",
      name: "AnswererAnswer",
      component: AnswererAnswer,
      meta: { requireAuth: true }
    },
    //-----------------------------------------------------------
    // voter
    {
      path: "/voter/vote",
      name: "VoterVote",
      component: VoterVote,
      meta: { requireAuth: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    firebase.auth().onAuthStateChanged(function(user) {
      user
        ? next()
        : next({ path: "/login", query: { redirect: to.fullPath } });
    });
  } else {
    next();
  }
});

export default router;
