<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>出題画面</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="questionMasters" :fields="fields">
          <template slot="buttons" slot-scope="data">
            <b-button v-if="isSelected(data.item) == false" @click="onClick(data.item)">
              出題する
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Administrator from "./mixins/Administrator";
import { mapState, mapGetters, mapActions } from "vuex";

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
    ...mapActions({
      select: 'question/select' // `this.add()` を `this.$store.dispatch('increment')` にマッピングする
    }),
    onClick(item) {
      let question = {
        number: item.number,
        sentence: item.sentence,
        isReady: false,
        visible: false,
      }
      if (item.image) question.image = item.image;
      this.select(question);
      this.$router.push({ name: "AdministratorSetQuestionStatus" });
    },
    isSelected(item) {
      return this.questions.some((i) => i.number == item.number)
    }
  }
};
</script>
