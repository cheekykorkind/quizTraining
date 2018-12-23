import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: [],
  },
  getters: {
    currentQuestion: (state) => {
      return state.list[state.list.length - 1];
    },
    currentAnswerer: (state) => {
      return "okazaki"
    }
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    }),
  }
};
