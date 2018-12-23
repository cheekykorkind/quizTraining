<template>
  <div style="padding: 2vh 2vw;">

    <div style="border: solid 1px; height: 45vh;">
      <H2> お題 </H2>
      <div style="width: 70%; float: left; text-align: left; padding: 0 1.5rem;">
        {{ currentQuestion }}
      </div>
      <div style="width: 30%; float: left;">
        イメージ
        {{ configs[0]['.value'] }}
      </div>
    </div>

    <div style="border: solid 1px; height: 45vh;">
      <H2> 回答者 </H2>
    </div>

  </div>

</template>

<script>
import Administrator from "./mixins/Administrator";
import firebase from "firebase";
import { mapState  } from "vuex";
import { log } from 'util';

export default {
  name: "Screen",
  mixins: [Administrator],
  components: {},
  data() {
    return {
      currentQuestion: ''
    };
  },
  computed: {
    ...mapState({
      configs: state => state.config.list,
    })
  },
  created() {
    // お題を取得
    this.getCurrentQuestionKey();
  },
  mounted() {},
  methods: {
    getCurrentQuestionKey() {
      firebase.database().ref('questions/currentQuestion').once('value')
        .then( snapshot => {
          this.getCurrentQuestion(snapshot.val());
        });
    },
    getCurrentQuestion(currentQuestionKey) {
      firebase.database().ref(`questions/${currentQuestionKey}/sentence`).once('value')
        .then( snapshot => {
          this.currentQuestion = snapshot.val();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: left;
}
</style>
