<template>
  <div>
    <b-row>
      <b-col class="text-left">
        <h1>お題(マスター)</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right">
        <b-button variant="primary">新規登録</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="questionMasters"></b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Administrator from "../mixins/Administrator";

export default {
  name: "AdministratorQuestionMastersIndex",
  mixins: [Administrator],
  computed: {
    ...mapState({
      questionMasters: state => state.questionMaster.list,
    })
  },
};
</script>
