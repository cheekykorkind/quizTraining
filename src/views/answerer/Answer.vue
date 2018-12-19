<template>
  <div>
    <h1>Answer</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <div v-if="currentUser && currentAnswerer == currentUser.name">あなたが回答者です</div>
    <b-button size="lg" variant="primary" @click="answer">回答する</b-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
      console.log("回答する")
    }
  }
};
</script>
