import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: [],
  },
  getters: {
    currentQuestion: (state) => {
      const currentKey = state.list.find(i => i['.key'] == 'currentQuestion')
      return currentKey ? state.list.find(i => i['.key'] == currentKey['.value']) : null
    },
    currentAnswerer: (state) => {
      const currentQuestionKey = state.list.find(i => i['.key'] == 'currentQuestion')
      if (currentQuestionKey == null) return null
      const currentQuestion = state.list.find(i => i['.key'] == currentQuestionKey['.value'])
      if (currentQuestion == null) return null
      const currentAnswererKey = currentQuestion.currentAnswerer
      if (currentAnswererKey == null) return null
      const currentAnswerer = currentQuestion.answerer[currentAnswererKey]
      if (currentAnswerer == null) return null
      return currentAnswerer
    }
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    }),
  }
};
