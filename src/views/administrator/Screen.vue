<template>
  <div style="padding: 2vh 2vw;">

    <div style="">
      <div style="text-align: left; padding: 0 1.5rem; font-size: 2rem;">
        <label> お題 : </label> {{ currentQuestion }}
      </div>
      <div style="
        height: 45vh;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        <b-img
          v-if="url"
          :src="url"
          fluid
          alt="Fluid image"
        />
      </div>
    </div>

    <div style="height: 30vh; padding-top: 1rem;">
      <label style="
        background-color: lightseagreen;
        color: rgb(255, 255, 255);
        padding: 0.3rem 1rem;
        border-radius: 20px;
        font-weight: bold;
        font-size: 1.4rem;"
      > 回答者 </label>
      {{ configs[0]['.value'] }}
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
      currentQuestion: '',
      url: null
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
    /**
     * 現在のお題のキーを取得
     */
    getCurrentQuestionKey() {
      firebase.database().ref('questions/currentQuestion').once('value')
        .then( snapshot => {
          // お題を取得
          this.getCurrentQuestion(snapshot.val());
        });
    },
    /**
     * お題を取得
     */
    getCurrentQuestion(currentQuestionKey) {
      firebase.database().ref(`questions/${currentQuestionKey}`).once('value')
        .then( snapshot => {
          this.currentQuestion = snapshot.val().sentence;

          // お題のイメージを取得
          if (snapshot.val().image) {
            this.getCurrentQuestionImage(snapshot.val().image);
          }
        });
    },
    /**
     * お題のイメージを取得
     */
    getCurrentQuestionImage(imagePath) {
      console.log('getImage');
      const ref = firebase.storage().ref().child(imagePath);
      const url = ref.getDownloadURL().then((url) => {
        this.url = url
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: left;
}
.img-fluid {
  height: 100%;
}
</style>
