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
        <router-view
          v-if="allCurrencies.length"
          v-bind:currencies="allCurrencies"
        />
      </b-container>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {

    async mounted() {
      this.fetchCurrencies()
    },

    methods: mapActions(['fetchCurrencies']),

    computed: mapGetters(['allCurrencies'])
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
