import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: [],
    uid: ''
  },
  mutations: {
    setUid(state, uid){
      state.uid = uid;
    },
  },
  getters: {
    getUser: (state) => (uid) => {
      return state.list.find(i => i['.key'] == uid)
    },
    current: (state) => {
      let currentUser = state.list.find(i => i['.key'] == state.uid)
      if (!currentUser) return null;
      currentUser['uid'] = state.uid;
      return currentUser;
    },
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    }),
  }
};
