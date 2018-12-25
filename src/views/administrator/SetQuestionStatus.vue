<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>お題進行画面</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3>モニタリング</h3>
        <h4>お題表示</h4>
        {{(currentQuestion && currentQuestion.visible) || 'なし'}}
        <h4>お題内容</h4>
        {{(currentQuestion && currentQuestion.sentence) || 'なし'}}
        <h4>回答者</h4>
        {{(currentAnswerer && getUser(currentAnswerer.uid).name) || 'なし'}}
        <h4>回答受付</h4>
        {{(currentQuestion && currentQuestion.isReady) || 'なし'}}
        <h4>投票受付</h4>
        {{(currentAnswerer && currentAnswerer.votable) || 'なし'}}
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3>進行</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- questions/{key}/visible --> <!-- true -->
        <b-button :disabled="!currentQuestion || currentQuestion.visible"
                  variant="primary"
                  @click="startQuiz()">
          お題表示
        </b-button>

        <!-- questions/{key}/isReady -->
        <b-button :disabled="!currentQuestion || !currentQuestion.visible || currentQuestion.isReady || (currentAnswerer && currentAnswerer.votable)"
                  variant="success"
                  @click="startAnswer()">
          回答受付
        </b-button>

        <!-- questions/{key}/answerer/{key}/answerable -->
        <b-button :disabled="!currentQuestion || !currentQuestion.isReady || !currentAnswerer || currentAnswerer.votable"
                  variant="success"
                  @click="startVote()">
          投票始め
        </b-button>

        <!-- questions/{key}/answerer/{key}/answerable -->
        <b-button :disabled="!currentAnswerer || !currentAnswerer.votable"
                  variant="success"
                  @click="endVote()">
          投票終了
        </b-button>

        <!-- questions/{key}/visible --> <!-- false, 遷移(出題画面) -->
        <b-button :disabled="(!currentQuestion || !currentQuestion.visible)"
                  variant="danger"
                  @click="endQuiz()">
          お題終了
        </b-button>

        <b-button variant="danger"
                  @click="calPoints()">
          点数
        </b-button>
      </b-col>
    </b-row>
  </b-container>
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
      questions: state => state.question.list,
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
        post.answerer[currentAnswererKey].votable = true;

        return post;
      });
    },
    endVote() {
      let currentQuestionKey = this.currentQuestionKey;
      let currentAnswererKey = this.currentAnswererKey;

      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.answerer[currentAnswererKey].votable = false;

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
    calPoints() {
      // firebase.database().ref('users').once('value').then(function(snapshot) {
      //   let uids = Object.keys(snapshot.val())
      //   console.log(uids);
      // });

      firebase.database().ref('questions').once('value').then(function(snapshot) {
        let questionKeys = Object.keys(snapshot.val())
        let questionObjs = snapshot.val();

        for (let k1 in questionObjs) {
          if (k1 == 'currentQuestionKey') continue;
          let question = questionObjs[k1];
          // console.log(question);
          for (let k2 in question) {
            if (k2 != 'answerer') continue;
            console.log(question[k2]);
          }
        }

        // questionKeys.forEach(k => {
        //   if (k == 'currentQuestionKey') return;

        //   let answerer = questionObj[k].answerer;
        //   let properties = Object.keys(answerer)

        //   properties.forEach(property => {
        //     console.log(answerer[property]);
        //     console.log(answerer[property].isIppon);
        //     console.log(answerer[property].uid);
        //   });
        // });

      });
    },
  }
};
</script>
