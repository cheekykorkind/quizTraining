<template>
  <div style="padding: 2vh 2vw;">
    <div v-if="currentQuestion && currentQuestion.visible">
      <div v-if="currentQuestion.image">
        <div style="text-align: left; padding: 0 1.5rem; font-size: 2rem; font-weight: bold;">
          <label> お題 : </label> {{ currentQuestion.sentence }}
        </div>
        <div style="height: 45vh; display: flex; justify-content: center; align-items: center;">
          <b-img
            :src="getCurrentQuestionImageUrl(currentQuestion.image)"
            fluid
            alt="Fluid image"
          />
        </div>
      </div>
      <div v-else>
        <div style="text-align: left; padding: 0 1.5rem; font-size: 4rem; font-weight: bold; height: 50vh;">
          <p style="font-size: 3rem;"> お題 : </p>
          {{ currentQuestion.sentence }}
        </div>
      </div>

      <div style="height: 30vh; padding-top: 1rem;">
        <label style="
          background-color: lightseagreen;
          color: rgb(255, 255, 255);
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 2rem;"
        > 回答者 </label>
        <div
          v-if="currentAnswerer"
          style="padding: 0 2rem;
        ">
          <div style="font-weight: bold; font-size: 3rem;">
            {{ getUser(currentAnswerer.uid).name }}
          </div>
          <b-progress
            height="4rem"
            :value="calIpponPoint()"
            variant="warning"
            :animated="isFixed()"
            class="mb-2"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div style="text-align: left; padding: 0 1.5rem; font-size: 4rem; font-weight: bold; height: 50vh;">
        次のお題をお待ち下さい
      </div>
    </div>
    <!-- <div v-if="isIppon && !isClose" style=" -->
    <div v-if="isIppon()" style="
      background-color: rgb(0, 0, 0);
      position: absolute;
      top: 0px;
      left: 0px;
      opacity: 0.9;
      width: 100%;
      height: 100%;
    ">
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40vh;
        color: #ffff0a;
        font-size: 8vw;
        font-weight: bold;
      "> 🎉🎊🎉🎊 IPPON! 🎉🎊🎉🎊 </div>
    </div>
  </div>
</template>

<script>
import Administrator from "./mixins/Administrator";
import firebase from "firebase";
import { mapGetters, mapState } from "vuex";
import { log } from 'util';
import Vue from "vue";

export default {
  name: "Screen",
  mixins: [Administrator],
  components: {},
  data() {
    return {
      url: null,
      isClose: false,
      values: []
    };
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
      configs: state => state.config.list,
    })
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * お題のイメージURLを取得
     */
    getCurrentQuestionImageUrl(imagePath) {
      const ref = firebase.storage().ref().child(imagePath);
      ref.getDownloadURL().then((url) => { this.url = url; });
      return this.url;
    },
    calIpponPoint() {
      let percentage = this.currentAnswerer.voteNum / this.configs[0]['.value'] * 100;
      if (percentage >= 100) {
        this.getCurrentQuestion();
      }

      return percentage;
    },
    getCurrentQuestion() {
      firebase.database().ref(`questions/${this.currentQuestionKey}/answerer/${this.currentAnswererKey}`)
        .update({
          isIppon: true
        });
    },
    isIppon() {
      if (!this.currentQuestion) return false;
      if (!this.currentQuestion.visible) return false;
      if (!this.currentAnswerer) return false;
      return this.currentAnswerer.isIppon;
    },
    isFixed() {
      if (!this.currentAnswerer.votable) {
        return false;
      }
      return true;
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
.progress {
  font-size: 3.5rem;
  font-weight: bold;

  /deep/ .progress-bar {
    color: red;
  }
}
.progress-custom  {
  background-color: #F1E60D;
}
</style>
