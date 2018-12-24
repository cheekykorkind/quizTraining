<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>投票画面</h1>
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
          <h3>投票</h3>
          <p>
            回答が面白かった場合はこのボタンを押してください
          </p>
          <div v-if="currentQuestion && currentQuestion.visible">
            <div v-if="currentAnswerer && currentAnswerer.votable">
              <b-button :disabled="!this.currentUser.isVotable" size="lg" variant="primary" :block="true" @click="vote" > IPPON!! </b-button>
            </div>
            <div v-else>
              <b-button :disabled="true" size="lg" variant="primary" :block="true">次の回答をお待ちください</b-button>
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
import Voter from "./mixins/Voter";

export default {
  name: "Vote",
  data: function () {
    return {
      isDisabled: false,
    }
  },
  mixins: [Voter],
  computed: {
    ...mapGetters({
      currentQuestion: 'question/currentQuestion',
      currentAnswerer: 'question/currentAnswerer',
      currentQuestionKey: 'question/currentQuestionKey',
      currentAnswererKey: 'question/currentAnswererKey',
      currentUser: 'user/current',
    }),
  },
  methods: {
    vote() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let uid = user.uid

          // 投票ボタンをdisabled
          this.isDisabled = true;

          // 投票でvoteNumをインクリメントする処理
          let voteTarget = firebase.database().ref("questions/" + this.currentQuestionKey + "/answerer/" + this.currentAnswererKey);
          voteTarget.transaction(function (post) {
            post.voteNum += 1;

            return post;
          })

          // 投票したら、投票可能フラグをfalseにする
          firebase.database().ref("users/"+uid).transaction(function(post) {
            if (post.isVotable) {
              post.isVotable = false;
            }

            return post;
          })
        }
      })
    }
  }
};
</script>
