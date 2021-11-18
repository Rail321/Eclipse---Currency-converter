const currency = {
  actions: {
    async fetchCurrencies(ctx) {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      const data = await response.json()
      const currencies = Object.values(data.Valute)

      currencies.unshift({
        CharCode: "RUB",
        Name: "Российский рубль",
        Value: 1,
      })
      
      ctx.commit('updateCurrencies', currencies)
    },
  },

  mutations: {
    updateCurrencies(state, currencies) {
      state.currencies = currencies
    },
  },

  state: {
    currencies: []
  },
  
  getters: {
    allCurrencies(state) {
      return state.currencies
    },
  },
}

export default currency