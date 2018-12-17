<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  created() {
    firebase.auth().onAuthStateChanged(u => {
      const db = firebase.database();
      const ref_users = db.ref("users");
      const ref_questions = db.ref("questions");
      if (u) {
        const ref_user = db.ref("users/" + u.uid);
        this.$store.dispatch("question/setListRef", ref_questions);
        this.$store.dispatch("user/setListRef", ref_users);
        this.$store.dispatch("user/setCurrentRef", ref_user);
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
  text-align: center;
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
