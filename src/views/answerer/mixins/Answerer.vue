<script>
import firebase from "firebase";

export default {
  name: "Answerer",
  created() {
    firebase.auth().onAuthStateChanged(u => {
      const db = firebase.database();
      if (u) {
        db.ref("users/" + u.uid)
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
