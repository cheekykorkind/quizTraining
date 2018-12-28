<template>
  <div id="team-page-wrap">
    <div id="team-wrap">
      <h1 class="team"> Team </h1>
      <div style="padding: 0 3vw;">
        <h2> 納富チーム </h2>
        <ul>
          <li> 美穂 </li>
          <li> 金子 </li>
          <li> ドヒョン </li>
          <li> 内田 </li>
        </ul>

        <h2> 浜崎チーム </h2>
        <ul>
          <li> 篠原 </li>
          <li> 政谷 </li>
          <li> 萩原 </li>
          <li> 甲斐 </li>
          <li> 吉野 </li>
        </ul>

        <h2> 櫻川チーム </h2>
        <ul>
          <li> 荒川 </li>
          <li> 古賀 </li>
          <li> 高瀬 </li>
          <li> 伊藤 </li>
          <li> ウソク </li>
        </ul>

        <h2> 杉本チーム </h2>
        <ul>
          <li> 徳永 </li>
          <li> 新川 </li>
          <li> 吉武  </li>
          <li> 野上 </li>
          <li> 嶋生 </li>
        </ul>

        <h2> 横田チーム </h2>
        <ul>
          <li> 岡部 </li>
          <li> 小原 </li>
          <li> 南部 </li>
          <li> 山路 </li>
          <li> 毛利 </li>
        </ul>

        <h2> 安元チーム </h2>
        <ul>
          <li> 巴山 </li>
          <li> 濱野 </li>
          <li> 早﨑 </li>
          <li> 広沢 </li>
          <li> 安河内 </li>
        </ul>

        <h2> 島田チーム </h2>
        <ul>
          <li> ゆっきー </li>
          <li> ジョン </li>
          <li> 渡辺 </li>
          <li> 竹田 </li>
          <li> 清家 </li>
        </ul>

        <h2> 山本チーム </h2>
        <ul>
          <li> 船越 </li>
          <li> 加賀澤 </li>
          <li> 紗慧 </li>
          <li> 畠中 </li>
          <li> 浦田 </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Team",
  components: {},
  data() {
    return { };
  },
  created() {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        firebase.database().ref("users/" + u.uid)
          .once("value")
          .then(snap => {
            if (!snap.val()) {
              this.$router.push({ name: "PermissionError" });
            }
          });
      }
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
h1.team {
  border-bottom: solid 0.4rem #dee2e6;
}

h2 {
  font-size: 1.3rem;
  margin-top: 2rem;
  font-weight: bold;
  background: #ED8077;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  width: 140px;
}

li {
  font-weight: bold;
  font-size: 1.1rem;
  color: #363636;
}

#team-page-wrap {
  padding: 1rem;
}
</style>

