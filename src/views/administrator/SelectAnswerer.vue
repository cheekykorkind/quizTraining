<template>
  <div>
  </div>
</template>

<script>
import Administrator from "./mixins/Administrator";
import { mapState, mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "SelectAnswerer",
  mixins: [Administrator],
  computed: {
    ...mapState({
      questionMasters: state => state.questionMaster.list,
      questions: state => state.question.list,
    })
  },
  components: {},
  methods: {
    test() {
        console.log('test');
    }
  }
};
</script>
