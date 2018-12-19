import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    currentQuestion: state => {
      return state.list[state.list.length - 1];
    }
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    })
  }
};
