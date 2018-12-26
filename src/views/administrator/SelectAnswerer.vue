<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>回答者選択画面</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>{{selected.length}}人を選択中です</p>
      </b-col>
      <b-col>
        <b-button :disabled="selected.length <= 0" @click="onClick(selected)">
          登録する
        </b-button>
      </b-col>
    </b-row>
    <b-row>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group>
          <b-form-checkbox-group stacked id="checkboxes" name="answerer" v-model="selected" :options="options"/>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Administrator from "./mixins/Administrator";
import { mapState, mapGetters, mapActions } from "vuex";
import firebase from "firebase";

export default {
  name: "SelectAnswerer",
  mixins: [Administrator],
  computed: {
    ...mapGetters({
      options: 'user/options',
    }),
  },
  data() {
    return {
      selected: []
    }
  },
  components: {},
  methods: {
    ...mapActions({
      select: 'user/select'
    }),
    onClick(uids) {
      this.select(uids);
      this.$router.push({ name: "AdministratorSelectQuestion" });
    }
  }
};
</script>
