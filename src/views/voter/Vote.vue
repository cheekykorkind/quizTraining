<template>
  <div>
    <h1>Vote</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <b-button
      size="lg"
      variant="primary"
      @click="vote"
      :disabled="isProcessing"
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
      currentAnswerer: 'question/currentAnswerer'
    }),
    ...mapState({
      currentUser: state => state.user.current,
      questions: state => state.question.list,
      currentQuestion: state => state.question.current
    })
  },
  methods: {
    vote: () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let uid = user.uid

          // 投票したら、投票可能フラグをfalseにする
          firebase.database().ref("users/"+uid).transaction(function(post) {
            if (post.canVote) {
              post.canVote = false;
            }
            return post;
          })

          let ref = firebase.database().ref("questions/3/answerer");

          // let uid = user.uid;
          // let data = {
          //   uid: uid
          // }

          // equalTo()のところは、回答した人の {key} が入る
          // firebase.database().ref("questions/3/answerer").orderByChild("uid").equalTo("kawano").on('value', function (snapshot) {
          //   let voteTargetKey = Object.keys(snapshot.val()).pop();
          //   console.log(voteTargetKey);
          // })
          // firebase.database().ref("questions/3/answerer/{key}/voters")
          //   .push(data)
          //   .then(result => {
          //     console.log('投票したよ');
          //   })

          // console.log(uid);
          // let canVote = firebase.database().ref("users/"+uid+"/canVote").once('value').then(function(snapshot) {
          //   console.log(snapshot.val());
          // })
        }
      })
    }
  }
};
</script>
