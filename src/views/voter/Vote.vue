<template>
  <div>
    <h1>Vote</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Voter from "./mixins/Voter";

export default {
  name: "Vote",
  mixins: [Voter],
  computed: {
    ...mapGetters({
      currentQuestion: 'question/currentQuestion'
    }),
    ...mapState({
      currentUser: state => state.user.current,
      questions: state => state.question.list,
    })
  }
};
</script>
