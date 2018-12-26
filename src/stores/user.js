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
    options: (state) => {
      return state.list.map(u => {
        return {text: u.name, value: u['.key']}
      }).sort((u1, u2) => {
        if (u1.text > u2.text) return 1;
        else if(u2.text > u1.text) return -1;
        else return 0;
      })
    }
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    }),
    select(context, uids) {
      console.log(uids);
    }
  }
};
