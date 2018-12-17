<template>
  <div class="container clearfix h-100">
    <div class="row mt-3 h-100 justify-content-center align-items-center">
      <div class="col p-0">
        <div class="row mt-3 justify-content-center align-items-center">
          <div class="col p-0">Administrator login</div>
        </div>
        <div class="row mt-3 justify-content-center align-items-center">
          <div class="col p-0">ID</div>
          <input type="text" class="form-control" v-model="username" />
        </div>
        <div class="row mt-3 justify-content-center align-items-center">
          <div class="col p-0">password</div>
          <input type="text" class="form-control" v-model="password" />
        </div>
        <div class="row mt-3 justify-content-center align-items-center">
          <button type="button" class="btn btn-primary" @click="doLogin()">
            login
          </button>
          <button type="button" class="btn btn-primary" @click="doLogout()">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "AdministratorLogin",
  components: {},
  computed: {},
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    // ログイン処理
    doLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
          this.$router.push({ name: "VoterVote" });
        });
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut();
    }
  }
};
</script>
