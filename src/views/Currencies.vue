<template>
  <div>
    <div class="about">
      <h1>Currencies</h1>
    </div>

    <select
      v-model="selectedCurrency"
    >
      <option
        v-for="(currency, key) of currencies"
        v-bind:key="key"
        v-bind:value="currency.CharCode"
      >
        {{ currency.Name }}
      </option>
    </select>

    <input type="text"
      v-model="searchString"
    >

    <div
      v-for="(currency, key) of filteredCurrencies"
      v-bind:key="key"
    >

      <div
        v-if="currency.CharCode !== selectedCurrency"
      >
        <hr/>
      
        <div>
          <div>{{ currency.Name }}</div>

          <div class="row">
            <div>
              1 {{ currency.CharCode }}
            </div>

            <div>
              {{ convert(currency.Value) }} {{ selectedCurrency }}
            </div>

            <template v-if="currency.Previous">

              <div>
                {{ currency.Value >= currency.Previous ? 'Вырос' : 'Упал' }}
              </div>

              <div>
                {{ Math.abs((currency.Value - currency.Previous) / currency.Value).toFixed(4) }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currencies: {
        type: Array,
        required: true,
      }
    },
  
    data() {
      return {
        searchString: '',
        selectedCurrency: 'RUB',
      }
    },

    async mounted() {
      // const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      // const data = await response.json()
      // this.currencies = Object.values(data.Valute)

      // this.currencies.unshift({
      //   CharCode: "RUB",
      //   Name: "Российский рубль",
      //   Value: 1,
      // })
    },

    methods: {
      convert(value) {
        if (this.selectedCurrency === 'RUB') {
          return value
        }

        return (1 / this.currencies.find(currency => currency.CharCode === this.selectedCurrency).Value * value).toFixed(4)
      }
    },

    computed: {
      filteredCurrencies() {
        return this.currencies.filter(currency => {
          return (currency.Name.toLowerCase().includes(this.searchString.toLowerCase()) ||
            currency.CharCode.toLowerCase().includes(this.searchString.toLowerCase()))
        })
      },
    },
}
</script>