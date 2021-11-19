const currency = {
  actions: {
    async fetchCurrencies(ctx) {
      try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        const data = await response.json()
        const currencies = Object.values(data.Valute)

        currencies.unshift({
          CharCode: "RUB",
          Name: "Российский рубль",
          Value: 1,
        })
        
        ctx.commit('updateCurrencies', currencies)
      } catch {
        ctx.commit('setCurrenciesLoadingError')

        console.error('Can`t fetch currencies!')
      }

      ctx.commit('setCurrenciesAsLoaded')
    },
  },

  mutations: {
    updateCurrencies(state, currencies) {
      state.currencies = currencies
    },

    setCurrenciesAsLoaded(state) {
      state.currenciesLoaded = true
    },

    setCurrenciesLoadingError(state) {
      state.currenciesLoadingError = true
    }
  },

  state: {
    currencies: [],
    currenciesLoaded: false,
    currenciesLoadingError: false
  },
  
  getters: {
    allCurrencies(state) {
      return state.currencies
    },

    isCurrenciesLoaded(state) {
      return state.currenciesLoaded
    },

    isCurrenciesLoadingError(state) {
      return state.currenciesLoadingError
    },
  },
}

export default currency