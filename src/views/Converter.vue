<template>
  <div class="about">
    <h1>Converter</h1>
  </div>

  <div class="row">

    <div>
      <div>{{ sourceCurrency.Name }}</div>
      
      <select
        v-model="sourceCurrency"
      >
        <option
          v-for="(currency, key) of currencies.filter(currency => currency !== targetCurrency)"
          v-bind:key="key"
          v-bind:value="currency"
        >
          {{ currency.CharCode }}
        </option>
      </select>
      
      <input type="number" step="0.01"
        v-model="sourceCurrencyValue"
      >
    </div>
    
    <div>
      <button
        v-on:click="() => [this.sourceCurrency, this.targetCurrency] = [this.targetCurrency, this.sourceCurrency]"
      >Replace</button>
    </div>
    
    <div>
      <div>{{ targetCurrency.Name }}</div>
      
      <select
        v-model="targetCurrency"
      >
        <option
          v-for="(currency, key) of currencies.filter(currency => currency !== sourceCurrency)"
          v-bind:key="key"
          v-bind:value="currency"
        >
          {{ currency.CharCode }}
        </option>
      </select>
      
      <input type="number" step="0.01" readonly
        v-bind:value="targetCurrencyValueC"
      >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currencies: [],
        sourceCurrency: {},
        sourceCurrencyValue: 1,
        targetCurrency: {},
        targetCurrencyValue: 0,
      }
    },

    async mounted() {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      const data = await response.json()
      this.currencies = Object.values(data.Valute)

      this.currencies.unshift({
        CharCode: "RUB",
        Name: "Российский рубль",
        Value: 1,
      })

      this.sourceCurrency = this.currencies.find(currency => currency.CharCode === 'USD')
      this.targetCurrency = this.currencies.find(currency => currency.CharCode === 'RUB')
    },

    computed: {
      targetCurrencyValueC() {
        return (this.sourceCurrency.Value * this.sourceCurrencyValue / this.targetCurrency.Value).toFixed(2)
      }
    }
  }
</script>