<template>
  <div class="pt-3 pb-5">
    <b-row>
      <b-col class="col-12 col-lg-6 pb-1">
        <b-form-select
          v-model="selectedCurrency"
        >
          <b-form-select-option
            v-for="(currency, key) of currencies"
            v-bind:key="key"
            v-bind:value="currency.CharCode"
          >
            <span>{{ currency.Name }}</span>
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col class="col-12 col-lg-6 pb-1">
        <b-form-input placeholder="Поиск..."
          v-model="searchString"
        ></b-form-input>
      </b-col>
    </b-row>

    <div class="pt-3">
      <div class="text-center text-light py-2"
        v-if="!filteredCurrencies.length"
      >
        <span>Ничего не найденоf</span>
      </div>

      <div
        v-else
      >
        <b-row>
          <b-col class="col-12 col-lg-6"
            v-for="(currency, key) of filteredCurrencies"
            v-bind:key="key"
          >
            <div class="bg-light mt-3 rounded-lg py-3 px-3 shadow">
              <p class="currency-name text-black-50 mb-3">
                <span>{{ currency.Name }}</span>
              </p>

              <div class="font-weight-bolder d-flex">
                <div class="flex-grow-1 mx-n1">
                  <div class="d-flex flex-nowrap">
                    <div class="flex-shrink-1 px-1">
                      <span>1 {{ currency.CharCode }}</span>
                    </div>

                    <div class="flex-shrink-1 px-2">
                      <b-icon-arrow-left-right
                        variant="secondary"
                      ></b-icon-arrow-left-right>
                    </div>

                    <div class="flex-grow-1 px-1">
                      <span>{{ convert(currency.Value) }} {{ selectedCurrency }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex-shrink-1 mx-n1">
                  <div class="d-flex flex-nowrap"
                    v-if="currency.Previous"
                    v-bind:class="{ 'text-danger': currency.Value > currency.Previous, 'text-success': currency.Value < currency.Previous }"
                  >
                    <div class="flex-shrink-1 px-1">
                      <b-icon-arrow-up
                        v-if="currency.Value > currency.Previous"
                        rotate="180"
                      ></b-icon-arrow-up>
                      <b-icon-arrow-up
                        v-else-if="currency.Value < currency.Previous"
                      ></b-icon-arrow-up>
                    </div>

                    <div class="flex-shrink-1 px-1">
                      <span>{{ Math.abs((currency.Value - currency.Previous) / currency.Value).toFixed(4) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
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
          return ( currency.CharCode !== this.selectedCurrency &&
            ( currency.Name.toLowerCase().includes(this.searchString.toLowerCase()) ||
            currency.CharCode.toLowerCase().includes(this.searchString.toLowerCase()) ) )
        })
      },
    },
}
</script>