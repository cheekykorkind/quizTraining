<template>
  <div>
    <h1>お題進行</h1>
    <div>
      お題状態 : {{currentQuestion.visible}}
    </div>
    <div>
      お題内容 : {{currentQuestion.sentence}}
    </div>
    <div>
      現在回答者 : {{ getUser(currentAnswerer.uid).name }}
    </div>
    <div>
      回答受け状況 : {{currentQuestion.isReady}}
    </div>
    <div>
      投票受け状況 : {{currentAnswerer.answerble}}
    </div>

    <!-- questions/{key}/visible --> <!-- true -->
    <b-button variant="primary" @click="startQuiz()">
      お題表示
    </b-button>
    <br/>

    <!-- questions/{key}/isReady -->
    <b-button variant="success" @click="startAnswer()">
      回答受け
    </b-button>
    <br/>

    <!-- questions/{key}/answerer/{key}/answerble -->
    <b-button variant="success" @click="startVote()">
      投票始め
    </b-button>
    <br/>

    <!-- questions/{key}/answerer/{key}/answerble -->
    <b-button variant="success" @click="endVote()">
      投票終了
    </b-button>
    <br/>

    <!-- questions/{key}/visible --> <!-- false, 遷移(出題画面) -->
    <b-button variant="danger" @click="endQuiz()">
      お題終了
    </b-button>
    <br/>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import firebase from "firebase";
import Administrator from "./mixins/Administrator";

export default {
  name: "SetQuestionStatus",
  mixins: [Administrator],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      currentQuestion: 'question/currentQuestion',
      currentAnswerer: 'question/currentAnswerer',
      getUser: 'user/getUser',
      currentQuestionKey: 'question/currentQuestionKey',
      currentAnswererKey: 'question/currentAnswererKey',
    })
  },
  created() {},
  methods: {
    startQuiz() {
      let currentQuestionKey = this.currentQuestionKey;
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.visible = true;

        return post;
      });
    },
    startAnswer() {
      let currentQuestionKey = this.currentQuestionKey;
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.isReady = true;

        return post;
      });
    },
    startVote() {
      let currentQuestionKey = this.currentQuestionKey;
      let currentAnswererKey = this.currentAnswererKey;

      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.isReady = false;
        post.answerer[currentAnswererKey].answerble = true;

        return post;
      });
    },
    endVote() {
      let currentQuestionKey = this.currentQuestionKey;
      let currentAnswererKey = this.currentAnswererKey;

      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.answerer[currentAnswererKey].answerble = false;

        return post;
      });
    },
    endQuiz() {
      let currentQuestionKey = this.currentQuestionKey;
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.visible = false;

        return post;
      });
    },
  }
};
</script>
