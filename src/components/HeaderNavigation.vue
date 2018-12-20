<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top bg-primary">
    <div class="collapse navbar-collapse">
      <ul v-if="currentUser" class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/team" class="text-light">Quiz Traning</router-link>
        </li>

        <li v-if="currentUser.administrator" class="nav-item ml-4">
          <router-link to="/administrator/inputPoints" class="text-light">inputPoints</router-link>
        </li>
        <li v-if="currentUser.administrator" class="nav-item ml-4">
          <router-link to="/administrator/selectPlayer" class="text-light">selectPlayer</router-link>
        </li>
        <li v-if="currentUser.administrator" class="nav-item ml-4">
          <router-link to="/administrator/selectQuestion" class="text-light">selectQuestion</router-link>
        </li>
        <li v-if="currentUser.administrator" class="nav-item ml-4">
          <router-link to="/administrator/setQuestionStatus" class="text-light">setQuestionStatus</router-link>
        </li>

        <li v-if="currentUser" class="nav-item ml-4">
          <router-link to="/team" class="text-light">Team</router-link>
        </li>
        <li v-if="currentUser.voter == true" class="nav-item ml-4">
          <router-link to="/voter/vote" class="text-light">Vote</router-link>
        </li>
        <li v-if="currentUser.answerer" class="nav-item ml-4">
          <router-link to="/answerer/answer" class="text-light">answer</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li v-if="currentUser" class="nav-item text-light"> {{ currentUser.name }} </li>
        <li class="nav-item ml-4 text-light" @click="doLogout()">Logout</li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  name: "HeaderNavigation",
  computed: mapState({
    currentUser: state => state.user.current,
  }),
    methods: {
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut();
    }
  },
};
</script>
