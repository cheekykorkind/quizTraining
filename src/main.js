import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import BootstrapVue from "bootstrap-vue";
import {firebaseEnv} from "./env";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

// Initialize Firebase
firebase.initializeApp(firebaseEnv);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
