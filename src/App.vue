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
    // this.$store.dispatch("user/init", firebase.firestore().collection('users'));
    firebase.auth().onAuthStateChanged(u => {
      const ref_message = firebase.database().ref('users')
      if (u && u.uid) {
        ref_message.limitToLast(10).on('child_added', this.setUser)
      } else {
        ref_message.limitToLast(10).off('child_added', this.setUser)
      }
    });
  },
  methods: {
    setUser(snap) {
      console.log(snap.val());
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
