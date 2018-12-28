<template>
  <b-navbar
    toggleable="md"
    type="dark"
    style="
      background: rgb(75,176,176);
      background: linear-gradient(90deg, rgba(75,176,176,1) 50%, rgba(153,204,204,1) 100%);
    "
  >
    <b-navbar-brand href="#"> Fusic忘年会2018! </b-navbar-brand>
    <b-navbar-toggle
      v-if="currentUser"
      target="nav_collapse"
    />
    <b-collapse
      v-if="currentUser"
      is-nav
      id="nav_collapse"
    >
      <b-navbar-nav>
        <b-nav-item
          v-if="currentUser && currentUser.answerer"
          to="/answerer/answer"
        > 回答 </b-nav-item>
        <b-nav-item
          v-if="currentUser && currentUser.voter"
          to="/voter/vote"
        > 投票 </b-nav-item>
        <b-nav-item to="/team"> チーム </b-nav-item>
        <b-nav-item to="/Schedule"> スケジュール </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown
          v-if="currentUser && currentUser.administrator"
          text="管理"
          right
        >
          <b-dropdown-item to="/administrator/selectAnswerer"> 解答者選択 </b-dropdown-item>
          <b-dropdown-item to="/administrator/selectQuestion"> 出題 </b-dropdown-item>
          <b-dropdown-item to="/administrator/setQuestionStatus"> お題進行 </b-dropdown-item>
          <b-dropdown-item to="/administrator/screen"> スクリーン </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item
          @click="doLogout()"
        > ログアウト </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "HeaderNavigation",
  computed: mapGetters({
    currentUser: 'user/current',
  }),
  methods: {
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut();
      location.reload();
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  font-weight: bold;
}
</style>
