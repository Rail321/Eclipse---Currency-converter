<template>
  <div class="app d-flex flex-column">
    <b-container class="bv-example-row">
      <b-nav>
        <b-nav-item
          to="/"
        >
          <span>Валюты</span>
        </b-nav-item>

        <b-nav-item
          to="/converter"
        >
          <span>Конвертер</span>
        </b-nav-item>
      </b-nav>
    </b-container>

    <div class="bg-primary flex-grow-1">
      <b-container>
        <div class="text-center text-light py-5"
          v-if="!isCurrenciesLoaded"
        >
          <b-spinner
            label="Loading..."
          ></b-spinner>
        </div>

        <div class="text-center text-light py-5"
          v-else-if="isCurrenciesLoadingError"
        >
          <span>Ошибка получения курса валют</span>
        </div>

        <div class="text-center text-light py-5"
          v-else-if="!allCurrencies.length"
        >
          <span>Нету курсов валют для отображения</span>
        </div>

        <router-view
          v-else
          v-bind:currencies="allCurrencies"
        />
      </b-container>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        currenciesLoading: true,
      }
    },

    async mounted() {
      this.fetchCurrencies()
      this.currenciesLoading = false
    },

    methods: mapActions([ 'fetchCurrencies' ]),

    computed: mapGetters(['allCurrencies', 'isCurrenciesLoaded', 'isCurrenciesLoadingError'])
  }
</script>

<style lang="scss">
  @import "~@/assets/scss/vendors/bootstrap-vue/index";

  .app {
    min-height: 100vh;
  }

  .currency-name {
    line-height: 1.15;
  }
</style>
