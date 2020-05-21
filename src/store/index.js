import Vue from 'vue'
import Vuex from 'vuex'

import { text, languages } from '@/assets/text'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text,
    languages,
    language: 'en'
  },
  getters: {
    getText: ({ text, language }) => (key) => {
      return text[language][key]
    },
    getTerm: ({ text, language }) => (term) => {
      return text[language].dict[term]
    }
  },
  mutations: {
    set (state, { key, value }) {
      state[key] = value
    }
  },
  actions: {
    setLanguage ({ commit }, lang) {
      commit('set', { key: 'language', value: lang })
    }
  },
  modules: {
  }
})
