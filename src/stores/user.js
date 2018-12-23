import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: [],
    current: null
  },
  getters: {
    getUser: (state) => (uid) => {
      return state.list.find(i => i['.key'] == uid)
    },
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
