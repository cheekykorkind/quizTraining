<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>お題進行画面</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3>モニタリング</h3>
        <h4>お題表示</h4>
        {{(currentQuestion && currentQuestion.visible) || 'なし'}}
        <h4>お題内容</h4>
        {{(currentQuestion && currentQuestion.sentence) || 'なし'}}
        <h4>回答者</h4>
        {{(currentAnswerer && getUser(currentAnswerer.uid).name) || 'なし'}}
        <h4>回答受付</h4>
        {{(currentQuestion && currentQuestion.isReady) || 'なし'}}
        <h4>投票受付</h4>
        {{(currentAnswerer && currentAnswerer.votable) || 'なし'}}
      </b-col>
      <b-col >
        <div v-if="ipponUsers" class="text-center">
          IPPON得点
        </div>
        <b-table v-if="fields" striped :items="ipponUsers" :fields="fields"></b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3>進行</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- questions/{key}/visible --> <!-- true -->
        <b-button :disabled="!currentQuestion || currentQuestion.visible"
                  variant="primary"
                  @click="startQuiz()">
          お題表示
        </b-button>

        <!-- questions/{key}/isReady -->
        <b-button :disabled="!currentQuestion || !currentQuestion.visible || currentQuestion.isReady || (currentAnswerer && currentAnswerer.votable)"
                  variant="success"
                  @click="startAnswer()">
          回答受付
        </b-button>

        <!-- questions/{key}/answerer/{key}/answerable -->
        <b-button :disabled="!currentQuestion || !currentQuestion.isReady || !currentAnswerer || currentAnswerer.votable"
                  variant="success"
                  @click="startVote()">
          投票始め
        </b-button>

        <!-- questions/{key}/answerer/{key}/answerable -->
        <b-button :disabled="!currentAnswerer || !currentAnswerer.votable"
                  variant="success"
                  @click="endVote()">
          投票終了
        </b-button>

        <!-- questions/{key}/visible --> <!-- false, 遷移(出題画面) -->
        <b-button :disabled="(!currentQuestion || !currentQuestion.visible)"
                  variant="danger"
                  @click="endQuiz()">
          お題終了
        </b-button>

        <b-button variant="danger"
                  @click="calPoints()">
          点数
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import firebase from "firebase";
import Administrator from "./mixins/Administrator";

export default {
  name: "SetQuestionStatus",
  mixins: [Administrator],
  components: {},
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: '名前',
          sortable: false
        },
        {
          key: 'ipponCount',
          label: 'ippon数',
          sortable: true
        }
      ],
      ipponUsers: []
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
      users: state => state.user.list,
      questions: state => state.question.list,
    })
  },
  created() {},
  methods: {
    startQuiz() {
      let currentQuestionKey = this.currentQuestionKey;
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.visible = true;

        return post;
      });
    },
    startAnswer() {
      let currentQuestionKey = this.currentQuestionKey;
      firebase.database().ref('users').once('value').then(function(snapshot) {
        Object.keys(snapshot.val()).forEach(k => {
          firebase.database().ref('users/' + k).child('isVotable').set(true)
        });
      });
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.isReady = true;
        post.currentAnswererKey = 'none';
        return post;
      });
    },
    startVote() {
      let currentQuestionKey = this.currentQuestionKey;
      let currentAnswererKey = this.currentAnswererKey;

      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.isReady = false;
        post.answerer[currentAnswererKey].votable = true;

        return post;
      });
    },
    endVote() {
      let currentQuestionKey = this.currentQuestionKey;
      let currentAnswererKey = this.currentAnswererKey;

      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.answerer[currentAnswererKey].votable = false;

        return post;
      });
    },
    endQuiz() {
      let currentQuestionKey = this.currentQuestionKey;
      firebase.database().ref('questions/'+currentQuestionKey).transaction(function (post) {
        post.visible = false;

        return post;
      });
      this.$router.push({ name: "AdministratorSelectQuestion" });
    },
    calPoints() {
      var _this = this;
      
      firebase.database().ref('questions').once('value').then((snapshot) => {
        let unsortedIpponUsers = [];
        let questionObj = snapshot.val();

        for (let k1 in questionObj) {
          if (k1 == 'currentQuestionKey') continue;
          let question = questionObj[k1];
          for (let k2 in question) {
            if (k2 != 'answerer') continue;
            let answerer = question[k2];
            for (let k3 in answerer) {
              let user = answerer[k3];
              if (user.isIppon == false) continue;
              unsortedIpponUsers.push(user.uid);
            }
          }
        }

        // 重複を数えてOjbectsのPropertyにまとめて配列に変える
        let countedIpponUsers = {};
        unsortedIpponUsers.forEach(function(x) {
          countedIpponUsers[x] = (countedIpponUsers[x] || 0) + 1; 
        });
        let ipponUsers = [];
        for (let uid in countedIpponUsers) {
          ipponUsers.push({
            'name': _this.getUser(uid).name,
            'ipponCount': countedIpponUsers[uid]
          });
        }

        _this.ipponUsers = ipponUsers;
      });
    },
  }
};
</script>
