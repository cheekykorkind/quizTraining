<template>
  <div>
    <h1>Question</h1>
    {{ getUser('xxxxxxxxxx') }}
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Administrator from "./mixins/Administrator";

export default {
  name: "Question",
  mixins: [Administrator],
  components: {},
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
    ...mapState({
      users: state => state.user.list,
    })
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
