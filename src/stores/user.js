export default {
  namespaced: true,
  state: {
    user: null,
    uid: '',
  },
  mutations: {
    setUser(state, {uid, user}) {
      state.uid = uid;
      state.user = user;
    },
  },
  actions: {
  },
  getters: {
    currentUser: state => {
      return state.user
    }
  },
  plugins: {}
};
