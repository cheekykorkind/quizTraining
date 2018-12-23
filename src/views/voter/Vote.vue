<template>
  <div>
    <h1>Vote</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <b-button size="lg" variant="primary" @click="vote">投票する</b-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import firebase from "firebase";
import Voter from "./mixins/Voter";

export default {
  name: "Vote",
  mixins: [Voter],
  computed: {
    ...mapGetters({
      currentQuestion: 'question/currentQuestion'
    }),
    ...mapState({
      currentUser: state => state.user.current,
      questions: state => state.question.list,
    })
  },
  methods: {
    vote: () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let uid = user.uid;
          let data = {
            uid: uid
          }
          firebase.database().ref("questions/3/answerer/{key}/voters")
            .push(data)
            .then(result => {
              console.log('投票したよ');
            })
        }
      })
    }
  }
};
</script>
