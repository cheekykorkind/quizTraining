<script>
import firebase from "firebase";

export default {
  name: "Answerer",
  created() {
    firebase.auth().onAuthStateChanged(u => {
      const db = firebase.database();
      if (u) {
        db.ref('questions/1/answerer/jiho/answers/1')
          .once("value")
          .then(snap => {
            if (!snap.val().isAnswerable) {
              this.$router.push({ name: "PermissionError" });
            }
          });
      }
    });
  }
};
</script>
