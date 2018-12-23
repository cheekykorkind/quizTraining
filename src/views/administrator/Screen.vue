<template>
  <div style="padding: 2vh 2vw;">

    <div style="">
      <div
        v-if="currentQuestion"
        style="text-align: left; padding: 0 1.5rem; font-size: 2rem; font-weight: bold;
      ">
        <label> お題 : </label> {{ currentQuestion.sentence }}
      </div>
      <div
        :v-if="currentQuestion.image"
        style=" height: 45vh; display: flex; justify-content: center; align-items: center;
      ">
        <b-img
          :src="getCurrentQuestionImageUrl(currentQuestion.image)"
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
          show-progress
          :animated="isFixed()"
          class="mb-2"
        >
        </b-progress>
      </div>
    </div>

  </div>

</template>

<script>
import Administrator from "./mixins/Administrator";
import firebase from "firebase";
import { mapGetters, mapState } from "vuex";
import { log } from 'util';

export default {
  name: "Screen",
  mixins: [Administrator],
  components: {},
  data() {
    return {
      url: null,
      ipponPoint: 75
    };
  },
  computed: {
    ...mapGetters({
      currentQuestion: 'question/currentQuestion',
      currentAnswerer: 'question/currentAnswerer',
      getUser: 'user/getUser',
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
      return this.currentAnswerer.voteNum / this.configs[0]['.value'] * 100;
    },
    isFixed() {
      if (!this.currentAnswerer.answerable) {
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
</style>
