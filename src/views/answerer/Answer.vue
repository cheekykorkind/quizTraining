<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>回答画面</h1>
      </b-col>
    </b-row>
    <div v-if="currentUser">
      <b-row>
        <b-col>
          <h3>あなたの名前</h3>
          <p>{{ currentUser.name }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3>お題</h3>
          <p v-if="currentQuestion && currentQuestion.visible">
            {{ currentQuestion.sentence }}
          </p>
          <p v-else>
            次のお題をお待ち下さい
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3>回答</h3>
          <p>
            スケッチブックに回答を書いてからこのボタンを押してください
          </p>
          <div v-if="currentQuestion && currentQuestion.visible">
            <div v-if="!currentAnswerer">
              <b-button size="lg" variant="primary" :block="true" @click="answer">回答する</b-button>
            </div>
            <div v-else>
              <div v-if="currentAnswerer.uid == currentUser.uid">
                <b-button :disabled="true" size="lg" variant="primary" :block="true">あなたが回答者です。回答してください</b-button>
              </div>
              <div v-else>
                <b-button :disabled="true" size="lg" variant="primary" :block="true">他の回答者が回答中です</b-button>
              </div>
            </div>
          </div>
          <div v-else>
            <b-button :disabled="true" size="lg" variant="primary" :block="true">次のお題をお待ちください</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      ログインしてください
    </div>
  </b-container>
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
    answer() {
      let postData = {
        uid : this.currentUser.uid,
        voteNum : 0,
        isIppon: false,
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
