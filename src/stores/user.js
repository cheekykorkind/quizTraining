export default {
  namespaced: true,
  state: {
    list: [],
    current: null
  },
  mutations: {
    add(state, { uid, user }) {
      state.list.push({ uid: uid, ...user });
    },
    setCurrent(state, { uid, user }) {
      state.current = { uid: uid, ...user };
    }
  }
};
