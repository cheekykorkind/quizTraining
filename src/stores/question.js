export default {
  namespaced: true,
  state: {
    list: [],
    current: null
  },
  mutations: {
    add(state, question) {
      state.list.push(question);
    },
    setCurrent(state, question) {
      state.current = question;
    }
  }
};
