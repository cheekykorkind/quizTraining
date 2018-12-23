import { firebaseAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    list: [],
  },
  getters: {
    currentQuestion: (state) => {
      const currentKey = state.list.find(i => i['.key'] == 'currentQuestionKey')
      return currentKey ? state.list.find(i => i['.key'] == currentKey['.value']) : null
    },
    currentAnswerer: (state) => {
      const currentQuestionKey = state.list.find(i => i['.key'] == 'currentQuestionKey')
      if (currentQuestionKey == null) return null
      const currentQuestion = state.list.find(i => i['.key'] == currentQuestionKey['.value'])
      if (currentQuestion == null) return null
      const currentAnswererKey = currentQuestion.currentAnswererKey
      if (currentAnswererKey == null) return null
      if (!currentQuestion.answerer) return null
      const currentAnswerer = currentQuestion.answerer[currentAnswererKey]
      if (currentAnswerer == null) return null
      return currentAnswerer
    },
    currentQuestionKey: (state) => {
      const currentKey = state.list.find(i => i['.key'] == 'currentQuestionKey')
      return currentKey ? currentKey['.value'] : null
    },
    currentAnswererKey: (state) => {
      const currentQuestionKey = state.list.find(i => i['.key'] == 'currentQuestionKey')
      if (currentQuestionKey == null) return null
      const currentQuestion = state.list.find(i => i['.key'] == currentQuestionKey['.value'])
      if (currentQuestion == null) return null
      return currentQuestion.currentAnswererKey
    },
  },
  actions: {
    setListRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef("list", ref);
    }),
  }
};
