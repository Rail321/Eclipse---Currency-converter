<template>
  <div>
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
          v-on:click="replaceCurrencies"
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
          v-bind:value="targetCurrencyValue"
        >
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
        sourceCurrency: this.currencies.find(currency => currency.CharCode === 'USD'),
        sourceCurrencyValue: 1,
        targetCurrency: this.currencies.find(currency => currency.CharCode === 'RUB'),
      }
    },

    computed: {
      targetCurrencyValue() {
        return (this.sourceCurrency.Value * this.sourceCurrencyValue / this.targetCurrency.Value).toFixed(2)
      }
    },

    methods: {
      replaceCurrencies() {
        [this.sourceCurrency, this.targetCurrency] = [this.targetCurrency, this.sourceCurrency]
        // this.sourceCurrencyValue = 1
      }
    },
  }
</script>