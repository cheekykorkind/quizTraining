import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

import firebase from "firebase";
import { environment } from './environments/environment';
firebase.initializeApp(environment.firebase);
firebase.firestore().settings({ timestampsInSnapshots: true });

import store from "./store";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
