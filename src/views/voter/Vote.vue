<template>
  <div>
    <h1>Vote</h1>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <b-button
      size="lg"
      variant="primary"
      @click="vote"
      :disabled="test()"
    > IPPON!! </b-button>
  </div>
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
      currentUser: 'user/current',
      currentQuestion: 'question/currentQuestion',
      currentAnswerer: 'question/currentAnswerer',
      currentQuestionKey: 'question/currentQuestionKey',
      currentAnswererKey: 'question/currentAnswererKey',
      currentUser: 'user/current',
    }),
  },
  methods: {
    test() {
      return this.currentUser.isVotable;
    },
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

          // 投票したら音を出す
          // const ctx = new AudioContext()
          // const oscillator = ctx.createOscillator()
          // const gainNode = ctx.createGain()
          // oscillator.type = 'sawtooth' //波系
          // oscillator.detune.value = 0
          // gainNode.gain.value = 0.6 //音量
          // oscillator.connect(gainNode)
          // gainNode.connect(ctx.destination)
          // oscillator.frequency.value = 780 //周波数
          // oscillator.start()

          // window.onload = function () {
          //   request = new XMLHttpRequest();
          //   request.open("GET", "src/sound/ha.mp3", true);
          //   request.responseType = "arraybuffer";
          //   request.onload = completeOnLoad;
          //   request.send();
          // };

          // function completeOnLoad() {
          //   window.AudioContext = window.AudioContext || window.webkitAudioContext;
          //   context = new AudioContext();
          //   context.createBufferSource().start(0);

          //   // オーディオをデコード
          //   context.decodeAudioData(request.response, function (buf) {
          //     source.buffer = buf;
          //     source.loop = false;

          //   });

          //   source = context.createBufferSource();

          //   var elem = document.getElementById("Play");
          //   elem.addEventListener("click", playStart, false);
          // }

          // function playStart() {
          //   source.connect(context.destination);
          //   source.start(0);
          // }

        }
      })
    }
  }
};
</script>
