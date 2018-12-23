<template>
  <div>
    <h1>SetQuestionStatus</h1>
    {{ currentQuestion ? currentQuestion.currentAnswerer : 'null' }}
    <br/>
    {{ currentAnswerer }}
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
    }),
    ...mapState({
      questions: state => state.question.list,
    })
  },
  created() {},
  methods: {}
};
</script>
