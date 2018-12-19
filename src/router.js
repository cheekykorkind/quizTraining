import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import PermissionError from "./views/PermissionError";
import VoterVote from "./views/voter/Vote";
import VoterTeam from "./views/voter/Team";
import AnswererAnswer from "./views/answerer/Answer";
import AdministratorLogin from "./views/administrator/Login";
import AdministratorInputPoints from "./views/administrator/InputPoints";
import AdministratorSelectPlayer from "./views/administrator/SelectPlayer";
import AdministratorSelectQuestion from "./views/administrator/SelectQuestion";
import AdministratorSetQuestionStatus from "./views/administrator/SetQuestionStatus";

import AdministratorQuestionsIndex from "./views/administrator/questions/Index";
import AdministratorQuestionsForm from "./views/administrator/questions/Form";
import AdministratorQuestionsShow from "./views/administrator/questions/Show";
import AdministratorQuestionsScreen from "./views/administrator/questions/Screen";
import AdministratorQuestionMastersIndex from "./views/administrator/question_masters/Index";
import AdministratorQuestionMastersForm from "./views/administrator/question_masters/Form";
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
      path: "/permission-error",
      name: "PermissionError",
      component: PermissionError
    },
    //-----------------------------------------------------------
    // administrator
    {
      path: "/administrator/login",
      name: "AdministratorLogin",
      component: AdministratorLogin,
      meta: { requireAuth: true }
    },
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
      path: "/administrator/questions",
      name: "AdministratorQuestionsIndex",
      component: AdministratorQuestionsIndex,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/questions/new",
      name: "AdministratorQuestionsForm",
      component: AdministratorQuestionsForm,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/questions/1",
      name: "AdministratorQuestionsShow",
      component: AdministratorQuestionsShow,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/questions/1/screen",
      name: "AdministratorQuestionsScreen",
      component: AdministratorQuestionsScreen,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/question_masters",
      name: "AdministratorQuestionMastersIndex",
      component: AdministratorQuestionMastersIndex,
      meta: { requireAuth: true }
    },
    {
      path: "/administrator/question_masters/new",
      name: "AdministratorQuestionMastersForm",
      component: AdministratorQuestionMastersForm,
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
      path: "/voter/team",
      name: "VoterTeam",
      component: VoterTeam,
      meta: { requireAuth: true }
    },
    {
      path: "/voter/vote",
      name: "VoterVote",
      component: VoterVote,
      meta: { requireAuth: true }
    }
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
