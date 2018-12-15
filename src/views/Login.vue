<template>
  <div class="container clearfix h-100">
    <div class="row mt-3 h-100 justify-content-center align-items-center">
      <div class="col p-0">
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
import store from '../store';
import {mapState} from 'vuex';

export default {
  name: "Login",
  components: {},
  computed: {
    ...mapState({
      user: state => state.user,
    })
  },
  data() {
    return {
      username: null,
      password: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        // TODO u.uuidを使用してDBから情報取得する
        const user = {
          uuid: '1234567890',
          name: 'test test',
          administrator: true,
          answerer: true,
          voter: true,
        };
        this.$store.commit('setUser', user);
        console.log(this.user);
      }
    });
  },
  methods: {
    // ログイン処理
    doLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
          this.$router.push({ name: "VoterTop" });
        });
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut();
    }
  }
};
</script>
