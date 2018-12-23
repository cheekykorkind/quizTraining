<template>
  <div>
    <h1>お題進行</h1>
    <div>
      お題状態 : {{currentQuestion && currentQuestion.visible}}
    </div>
    <div>
      お題内容 : {{currentQuestion && currentQuestion.sentence}}
    </div>
    <div>
      現在回答者 : {{ currentAnswerer && getUser(currentAnswerer.uid).name }}
    </div>
    <div>
      回答受付状況 : {{currentQuestion && currentQuestion.isReady}}
    </div>
    <div>
      投票受付状況 : {{currentAnswerer && currentAnswerer.answerable}}
    </div>

    <!-- questions/{key}/visible --> <!-- true -->
    <b-button variant="primary" @click="startQuiz()">
      お題表示
    </b-button>
    <br/>

    <!-- questions/{key}/isReady -->
    <b-button variant="success" @click="startAnswer()">
      回答受付
    </b-button>
    <br/>

    <!-- questions/{key}/answerer/{key}/answerable -->
    <b-button variant="success" @click="startVote()">
      投票始め
    </b-button>
    <br/>

    <!-- questions/{key}/answerer/{key}/answerable -->
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
    }),
    ...mapState({
      users: state => state.user.list,
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
      firebase.database().ref('users').once('value').then(function(snapshot) {
        Object.keys(snapshot.val()).forEach(k => {
          firebase.database().ref('users/' + k).child('isVotable').set(true)
        });
      });
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.isReady = true;
        post.currentAnswererKey = 'none';
        return post;
      });
    },
    startVote() {
      let currentQuestionKey = this.currentQuestionKey;
      let currentAnswererKey = this.currentAnswererKey;

      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.isReady = false;
        post.answerer[currentAnswererKey].answerable = true;

        return post;
      });
    },
    endVote() {
      let currentQuestionKey = this.currentQuestionKey;
      let currentAnswererKey = this.currentAnswererKey;

      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.answerer[currentAnswererKey].answerable = false;

        return post;
      });
    },
    endQuiz() {
      let currentQuestionKey = this.currentQuestionKey;
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.visible = false;

        return post;
      });
      this.$router.push({ name: "AdministratorSelectQuestion" });
    },
  }
};
</script>
