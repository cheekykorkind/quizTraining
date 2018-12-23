<template>
  <div>
    <h1>Answer</h1>
    <div v-if="currentUser">sss：{{ currentUser }}</div>
    <div v-if="currentUser">sss：{{ currentUser.key }}</div>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentUser">ユーザadministrator：{{ currentUser.administrator }}</div>
    <div v-if="currentUser">ユーザanswerer：{{ currentUser.answerer }}</div>
    <div v-if="currentUser">ユーザvoter：{{ currentUser.voter }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <div v-if="currentUser.answerer">あなたが回答者です</div>
    <b-button size="lg" variant="primary" @click="answer">回答する</b-button>
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
    answer: () => {
      firebase.auth().onAuthStateChanged(u => {
        let uid = u.uid;

        if (u) {
          firebase.database().ref('questions/3/answerer').orderByChild("uid").equalTo(uid).once('value').then(function(snapshot) {
            let pushKey = Object.keys(snapshot.val()).pop();
            // console.log(pushKey);

            return pushKey;
          }).then(function(pushKey){
            firebase.database().ref('questions/3').transaction(function (post) {
              if (post.isReady) {
                post.whoIsFirstAnswerer = pushKey;
                post.isReady = false;
              }

              return post;
            })
          })
        }

      });
    },

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
