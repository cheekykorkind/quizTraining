<script>
import firebase from "firebase";

export default {
  name: "Voter",
  created() {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        firebase.database().ref("users/" + u.uid)
          .once("value")
          .then(snap => {
            if (!snap.val().voter) {
              this.$router.push({ name: "PermissionError" });
            }
          });
      }
    });
  }
};
</script>
