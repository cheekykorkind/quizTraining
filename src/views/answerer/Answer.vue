<template>
  <div>
    <h1>Answer</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <div v-if="currentAnswerer && currentUser && currentAnswerer.uid == currentUser.uid">あなたが回答者です</div>
    <b-button :disabled="isAnswerable() == false" size="lg" variant="primary" @click="answer">回答する</b-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import firebase from "firebase";
import Answerer from "./mixins/Answerer";

export default {
  name: "Answer",
  mixins: [Answerer],
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      currentUser: 'user/current',
      currentQuestion: 'question/currentQuestion',
      currentAnswerer: 'question/currentAnswerer',
      currentQuestionKey: 'question/currentQuestionKey',
      currentAnswererKey: 'question/currentAnswererKey',
    }),
  },
  methods: {
    isAnswerable() {
      if (!this.currentUser) return false
      if (!this.currentQuestion) return false
      if (!this.currentQuestion.isReady) return false
      if (this.currentAnswererKey) return false
      return true
    },
    answer() {
      let postData = {
        uid : this.currentUser.uid,
        voteNum : 0,
      };
      firebase.database().ref('questions/' + this.currentQuestionKey).child('answerer')
        .push(postData)
        .then(reference => {
          let pushKey = reference.path.pieces_.pop();
          firebase.database().ref('questions/' + this.currentQuestionKey).transaction(function (post) {
            post.currentAnswererKey = pushKey;
            return post;
          })
        });
    },

    // // 開発用。参考
    // answerOld: () => {
    //   firebase.auth().onAuthStateChanged(u => {
    //     let uid = u.uid;

    //     if (u) {
    //       firebase.database().ref('questions/3/answerer').orderByChild("uid").equalTo(uid).once('value').then(function(snapshot) {
    //         let pushKey = Object.keys(snapshot.val()).pop();
    //         // console.log(pushKey);

    //         return pushKey;
    //       }).then(function(pushKey){
    //         firebase.database().ref('questions/3').transaction(function (post) {
    //           if (post.isReady) {
    //             post.whoIsFirstAnswerer = pushKey;
    //             post.isReady = false;
    //           }

    //           return post;
    //         })
    //       })
    //     }

    //   });
    // },

    // // 開発用。参考
    // appendUser: () => {
    //   firebase.auth().onAuthStateChanged(u => {
    //     let _uid = u.uid;
    //     let postData = {
    //       uid : 'kawano'
    //     };

    //     if (u) {
    //       firebase.database().ref('questions/3').child('answerer')
    //         .push(postData)
    //         .then(result => {
    //           console.log("appendUser");
    //         });
    //     }
    //   });
    // },

    // // 開発用。参考
    // getUID: () => {
    //   firebase.database().ref('questions/3/answerer').orderByChild("uid").equalTo('kawano').once('value').then(function(snapshot) {
    //     let tempResult = Object.keys(snapshot.val()).pop();
    //     return tempResult;
    //   }).then(function(result){
    //     console.log(result);
    //   });
    // }
  }
};
</script>
