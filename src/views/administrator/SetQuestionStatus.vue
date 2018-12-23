<template>
  <div>
    <h1>お題進行</h1>

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
      投票受け
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
      currentQuestionKey: 'question/currentQuestionKey',
      currentAnswererKey: 'question/currentAnswererKey',
    }),
    ...mapState({
      questions: state => state.question.list,
    })
  },
  created() {},
  methods: {
    startQuiz: () => {
      alert('startQuiz');
    },
    startAnswer: () => {
      alert('startAnswer');
    },
    startVote: () => {
      alert('startVote');
    },
    endQuiz: () => {
      alert('endQuiz');
    },
  }
};
</script>
