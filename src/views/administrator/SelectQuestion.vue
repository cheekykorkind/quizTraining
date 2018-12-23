<template>
  <div>
    <h1>出題</h1>
    <b-table striped hover :items="questionMasters" :fields="fields">
      <template slot="buttons" slot-scope="data">
        <b-button v-if="isSelected(data.item) == false" @click="onClick(data.item)">
          出題する
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import Administrator from "./mixins/Administrator";
import { mapState, mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "SelectQuestion",
  mixins: [Administrator],
  computed: {
    ...mapState({
      questionMasters: state => state.questionMaster.list,
      questions: state => state.question.list,
    })
  },
  components: {},
  data() {
    return {
      fields: {
        number: {
          label: 'No',
          sortable: true,
        },
        sentence: {
          label: 'お題',
          sortable: true,
        },
        buttons: {
          label: ''
        }
      },
    };
  },
  created() {},
  methods: {
    onClick(item) {
      const questionsRef = firebase.database().ref('questions')
      let question = {
        number: item.number,
        sentence: item.sentence,
        isReady: false,
        visible: false,
      }
      if (item.image) question.image = item.image;
      const key = questionsRef.push(question).key;
      questionsRef.transaction((post) => {
        if (post) {
          post.currentQuestionKey = key;
        }
        return post;
      })
      this.$router.push({ name: "AdministratorSetQuestionStatus" });
    },
    isSelected(item) {
      return this.questions.some((i) => i.number == item.number)
    }
  }
};
</script>
