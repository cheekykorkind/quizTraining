<template>
  <div>
    <h1>SetQuestionStatus</h1>
    <b-img :src="url" fluid alt="Fluid image" />
  </div>
</template>

<script>
import Administrator from "./mixins/Administrator";
import firebase from "firebase";

export default {
  name: "SetQuestionStatus",
  mixins: [Administrator],
  components: {},
  data() {
    return {
      url: ''
    };
  },
  created() {
    const ref = firebase.storage().ref().child('questions/1.jpg');
    const url = ref.getDownloadURL().then((url) => {
      this.url = url
    });
  },
  methods: {}
};
</script>
