<template>
  <div id="app">
    <HeaderNavigation/>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
import HeaderNavigation from './components/HeaderNavigation.vue'

export default {
	components: {
		HeaderNavigation
	},
  created() {
    firebase.auth().onAuthStateChanged(u => {
      const db = firebase.database();
      const ref_users = db.ref("users");
      const ref_questions = db.ref("questions");
      const ref_questionMasters = db.ref("questionMasters");
      const ref_configs = db.ref("configs");
      if (u) {
        const ref_user = db.ref("users/" + u.uid);
        this.$store.dispatch("question/setListRef", ref_questions);
        this.$store.dispatch("user/setListRef", ref_users);
        this.$store.dispatch("questionMaster/setListRef", ref_questionMasters);
        this.$store.dispatch("user/setCurrentRef", ref_user);
        this.$store.dispatch("config/setListRef", ref_configs);
      } else {
        // TODO unbindする
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
