<template>
  <div>
    <h1>Vote</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <b-button
      size="lg"
      variant="primary"
      @click="vote"
    > 投票する </b-button>
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
      currentQuestion: 'question/currentQuestion',
      currentAnswerer: 'question/currentAnswerer',
      currentQuestionKey: 'question/currentQuestionKey',
      currentAnswererKey: 'question/currentAnswererKey',
    }),
  },
  methods: {
    vote() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let uid = user.uid

          // 投票でvoteNumをインクリメントする処理
          let voteTarget = firebase.database().ref("questions/" + this.currentQuestionKey + "/answerer/" + this.currentAnswererKey);
          voteTarget.transaction(function (post) {
            post.voteNum += 1;
            return post;
          })
            
          // 投票したら、投票可能フラグをfalseにする
          firebase.database().ref("users/"+uid).transaction(function(post) {
            if (post.canVote) {
              post.canVote = false;
            }
            return post;
          })

          
        }
      })
    }
  }
};
</script>
