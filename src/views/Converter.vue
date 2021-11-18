<template>
  <div class="mt-5">
    <b-row class="px-3">
      <b-col class="col-12 col-lg-8 offset-lg-2">
        <b-row class="flex-nowrap align-items-center">
          <b-col class="col-5 bg-light rounded-lg pt-2 pb-1 px-3 shadow align-self-stretch d-flex flex-column">
            <p class="currency-name text-black-50 mb-3 flex-grow-1">
              <span>{{ sourceCurrency.Name }}</span>
            </p>
            
            <b-row class="flex-wrap mx-n1">
              <b-col class="col-12 col-sm-6 pb-2 px-1">
                <b-form-select
                  v-model="sourceCurrency"
                >
                  <b-form-select-option
                    v-for="(currency, key) of currencies.filter(currency => currency !== targetCurrency)"
                    v-bind:key="key"
                    v-bind:value="currency"
                  >
                    <span>{{ currency.CharCode }}</span>
                  </b-form-select-option>
                </b-form-select>
              </b-col>

              <b-col class="col-12 col-sm-6 pb-2 px-1">
                <b-form-input
                  v-model="sourceCurrencyValue"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
          
          <b-col class="col-2 text-center">
            <b-button class="p-1 p-sm-2 rounded-circle d-block mx-auto"
              variant="light"
              size="sm"
              v-on:click="replaceCurrencies"
            >
              <b-icon-arrow-left-right class="d-block w-100"
                font-scale="1"
                variant="secondary"
              ></b-icon-arrow-left-right>
            </b-button>
          </b-col>
          
          
          <b-col class="col-5 bg-light rounded-lg pt-2 pb-1 px-3 shadow align-self-stretch d-flex flex-column">
            <p class="currency-name text-black-50 mb-3 flex-grow-1">
              <span>{{ targetCurrency.Name }}</span>
            </p>
            
            <b-row class="flex-wrap mx-n1">
              <b-col class="col-12 col-sm-6 pb-2 px-1">
                <b-form-select
                  v-model="targetCurrency"
                >
                  <b-form-select-option
                    v-for="(currency, key) of currencies.filter(currency => currency !== sourceCurrency)"
                    v-bind:key="key"
                    v-bind:value="currency"
                  >
                    <span>{{ currency.CharCode }}</span>
                  </b-form-select-option>
                </b-form-select>
              </b-col>

              <b-col class="col-12 col-sm-6 pb-2 px-1">
                <b-form-input
                  readonly
                  v-bind:value="targetCurrencyValue"
                ></b-form-input>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
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