import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    })
  }
};
