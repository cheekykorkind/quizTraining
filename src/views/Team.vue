<template>
  <h1>Team</h1>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Team",
  components: {},
  data() {
    return {};
  },
  created() {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        firebase.database().ref("users/" + u.uid)
          .once("value")
          .then(snap => {
            if (!snap.val()) {
              this.$router.push({ name: "PermissionError" });
            }
          });
      }
    });
  },
  methods: {}
};
</script>
