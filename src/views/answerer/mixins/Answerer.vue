<script>
import firebase from "firebase";

export default {
  name: "Answerer",
  created() {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        firebase.database().ref("users/" + u.uid)
          .once("value")
          .then(snap => {
            if (!snap.val().answerer) {
              this.$router.push({ name: "PermissionError" });
            }
          });
      }
    });
  }
};
</script>