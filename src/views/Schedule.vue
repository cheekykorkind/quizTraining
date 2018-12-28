<template>
  <div id="team-page-wrap">
    <div id="schedule-wrap">
      <h1> Schedule </h1>
      <table class="table b-table b-table-stacked">
        <tbody role="rowgroup" class="">
          <tr role="row" class="">
            <td aria-colindex="1" data-label="15:00 〜 15:30"><div> 一次会オープニング </div></td>
            <td aria-colindex="1" data-label="15:30 〜 15:45"><div> 360発表 </div></td>
            <td aria-colindex="1" data-label="15:45 〜 16:15"><div> 半期目標 </div></td>
            <td aria-colindex="1" data-label="16:15 〜 16:25"><div> 小休憩 </div></td>
            <td aria-colindex="1" data-label="16:25 〜 17:30"><div> レクレーション第1段！ </div></td>
            <td aria-colindex="1" data-label="17:40 〜 18:20">
              <div>
                <p> 移動 </p>
                <p style="font-size: 0.8rem;"> アンダースピン（博多区中洲3-7-24 gate's 8F） </p>
                <p style="font-size: 0.8rem; color: #E91E63;"> ※開場は18:00〜です。早く着いても入れません！ </p>
                <p style="font-size: 0.8rem; color: #E91E63;"> ※18:20までには着席完了していてください。 </p>
              </div>
            </td>
            <td aria-colindex="1" data-label="18:30 〜 18:40"><div> 二次会オープニング </div></td>
            <td aria-colindex="1" data-label="18:40 〜 19:40"><div> レクレーション第2段！ </div></td>
            <td aria-colindex="1" data-label="19:40 〜 20:25"><div> お楽しみ♥ </div></td>
            <td aria-colindex="1" data-label="20:25 〜 20:35"><div> 結果発表 </div></td>
            <td aria-colindex="1" data-label="20:35 〜 20:45"><div> 二次会クロージング </div></td>
            <td aria-colindex="1" data-label="20:45 〜 21:00"><div> 完全撤退！ </div></td>
          </tr>
        </tbody>
      </table>
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

table.b-table.b-table-stacked > tbody > tr > [data-label]::before {
  width: 28vw;
  text-align: center;
}

#team-page-wrap {
  padding: 1rem;
}
</style>

