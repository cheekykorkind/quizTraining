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
        ref_users.limitToLast(10).on("child_added", this.setUser);
        ref_questions.limitToLast(10).on("child_added", this.setQuestion);
        db.ref("users/" + u.uid)
          .once("value")
          .then(snap => {
            this.$store.commit("user/setCurrent", {
              uid: snap.key,
              user: snap.val()
            });
          });
      } else {
        ref_users.limitToLast(10).off("child_added", this.setUser);
        ref_questions.limitToLast(10).off("child_added", this.setQuestion);
      }
    });
  },
  methods: {
    setUser(snap) {
      this.$store.commit("user/add", { uid: snap.key, user: snap.val() });
    },
    setQuestion(snap) {
      this.$store.commit("question/add", snap.val());
      this.$store.commit("question/setCurrent", snap.val());
    }
  }
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
