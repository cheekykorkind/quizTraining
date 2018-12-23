<template>
  <div>
    <h1>解答者選択</h1>
    <b-button @click="resetAnswerer()">解答者をリセット</b-button>
    <b-table striped hover :items="users" :fields="fields">
      <template slot="buttons" slot-scope="data">
        <b-button @click="onClick()">
          解答者として登録
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
  name: "SelectAnswerer",
  mixins: [Administrator],
  computed: {
    ...mapState({
      users : state => state.user.list,
    })
  },
  data() {
    return {
      fields: {
        buttons: {
          label: ''
        }
      }
    }
  },
  components: {},
  methods: {
    resetAnswerer() {
      console.log('reset');
    },
    onClick() {
        console.log('test');
    },
  }
};
</script>
