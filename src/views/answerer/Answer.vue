<template>
  <div>
    <h1>Answer</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Answerer from "./mixins/Answerer";

export default {
  name: "Answer",
  mixins: [Answerer],
  computed: mapState({
    currentUser: state => state.user.current,
    questions: state => state.question.list,
    currentQuestion: state => state.question.current
  })
};
</script>
