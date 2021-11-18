import { createStore } from 'vuex'
import currency from './modules/currency'

const store = createStore({
  modules: {
    currency,
  }
})

export default store
