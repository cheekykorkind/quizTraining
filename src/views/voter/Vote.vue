<template>
  <div>
    <h1>Vote</h1>
    <div v-if="currentUser">ログイン中のユーザ：{{ currentUser.name }}</div>
    <div v-if="currentQuestion">現在の問題：{{ currentQuestion.sentence }}</div>
    <b-button size="lg" variant="primary" @click="vote">投票する</b-button>
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
  },
  methods: {
    vote: () => {
      console.log("投票する")
    }
  }
};
</script>
