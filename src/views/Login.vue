<template>
  <div class="container clearfix h-100">
    <div class="row mt-3 h-100 justify-content-center align-items-center">
      <div class="col p-0">
        <div class="row mt-3 justify-content-center align-items-center">
          <div class="col p-0"> ID </div>
          <input
            type="text"
            class="form-control"
            v-model="username"
          >
        </div>
        <div class="row mt-3 justify-content-center align-items-center">
          <div class="col p-0"> password </div>
          <input
            type="text"
            class="form-control"
            v-model="password"
          >
        </div>
        <div class="row mt-3 justify-content-center align-items-center">
          <button
            type="button"
            class="btn btn-primary"
            @click="doLogin()"
          > login </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// firebase モジュール
import firebase from 'firebase'

export default {
  name: "home",
  components: {},
  data() {
    return {
      user: {},  // ユーザー情報
      username: null,
      password: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      console.log(this.user);
    })
  },
  methods: {
    // ログイン処理
    doLogin() {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(res => {
        console.log(res);
      });
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut()
    },
  }
};
</script>
