<script>
import firebase from "firebase";

export default {
  name: "Administrator",
  created() {
    firebase.auth().onAuthStateChanged(u => {
      const db = firebase.database();
      if (u) {
        db.ref("users/" + u.uid)
          .once("value")
          .then(snap => {
            if (!snap.val().administrator) {
              this.$router.push({ name: "PermissionError" });
            }
          });
      }
    });
  }
};
</script>