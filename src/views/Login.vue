<template>
  <div style="padding: 25vh 10vw;">
    <div style="margin-bottom: 2rem;">
      <div>
        <label for="inputFormatter"> メールアドレス </label>
        <b-form-input
          v-model="username"
          type="text"
          placeholder="会社のメールアドレスを入力してください"
          size="lg"
        />
      </div>
      <div style="margin-top: 2rem;">
        <label for="inputFormatter"> パスワード </label>
        <b-form-input
          v-model="password"
          type="password"
          placeholder="パスワードを入力してください"
          size="lg"
        />
      </div>
    </div>

    <div style="display: flex; justify-content: center; align-items: center;">
      <b-button
        size="lg"
        variant="primary"
        @click="doLogin()"
        style="font-weight: bold; background-color: #3F51B5; border: none;"
      >
        ログイン
      </b-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
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
          this.$router.push({ name: "Team" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  width: 100%;
  text-align: left;
}

.form-control-lg {
  font-size: 0.9rem;
}
</style>
