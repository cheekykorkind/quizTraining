<template>
  <b-container id="page-wrap">
    <b-row>
      <b-col>
        <h1> 回答画面 </h1>
      </b-col>
    </b-row>
    <div v-if="currentUser">
      <b-row>
        <b-col>
          <h3>あなたの名前</h3>
          <p>{{ currentUser.name }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3>お題</h3>
          <p v-if="currentQuestion && currentQuestion.visible">
            {{ currentQuestion.sentence }}
          </p>
          <p v-else>
            次のお題をお待ち下さい
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3>回答</h3>
          <p>
            スケッチブックに回答を書いてからこのボタンを押してください
          </p>
          <div v-if="currentQuestion && currentQuestion.isReady">
            <div v-if="!currentAnswerer">
              <b-button
                size="lg"
                variant="primary"
                :block="true"
                @click="answer"
                class="btn"
              > 回答する </b-button>
            </div>
            <div v-else>
              <div v-if="currentAnswerer.uid == currentUser.uid">
                <b-button
                  :disabled="true"
                  size="lg"
                  variant="primary"
                  :block="true"
                  class="btn"
                > あなたが回答者です。回答してください </b-button>
              </div>
              <div v-else>
                <b-button
                  :disabled="true"
                  size="lg"
                  variant="primary"
                  :block="true"
                  class="btn"
                > 他の回答者が回答中です </b-button>
              </div>
            </div>
          </div>
          <div v-else>
            <b-button
              :disabled="true"
              size="lg"
              variant="primary"
              :block="true"
              class="btn"
            > 回答開始をお待ちください </b-button>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      ログインしてください
    </div>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import firebase from "firebase";
import Answerer from "./mixins/Answerer";

export default {
  name: "Answer",
  mixins: [Answerer],
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      currentUser: 'user/current',
      currentQuestion: 'question/currentQuestion',
      currentAnswerer: 'question/currentAnswerer',
      currentQuestionKey: 'question/currentQuestionKey',
      currentAnswererKey: 'question/currentAnswererKey',
    }),
  },
  methods: {
    answer() {
      let postData = {
        uid : this.currentUser.uid,
        voteNum : 0,
        isIppon: false,
      };
      firebase.database().ref('questions/' + this.currentQuestionKey).child('answerer')
        .push(postData)
        .then(reference => {
          let pushKey = reference.path.pieces_.pop();
          firebase.database().ref('questions/' + this.currentQuestionKey).transaction(function (post) {
            post.currentAnswererKey = pushKey;
            return post;
          })
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  border-bottom: solid 0.4rem #dee2e6;
  font-weight: bold;
}
h3 {
  margin-top: 2rem;
  font-weight: bold;
}
#page-wrap {
  padding: 1rem;
}
.btn {
  height: 15vh;
  background-color: #007bff;
  border-color: #007bff;
  font-size: 2.7vh;
  font-weight: bold;
  color: #fff;
}
p {
  font-size: 1.2rem;
  padding: 0 0.8rem;
}
</style>
