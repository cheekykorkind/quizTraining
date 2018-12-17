import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: [],
    current: null
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    }),
    setCurrentRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("current", ref);
    })
  }
};
