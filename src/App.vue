<template>
  <div id="nav">

    <router-link to="/">Currencies</router-link> |
    
    <router-link to="/converter">Converter</router-link>
  </div>

  <router-view
    v-bind:currencies="currencies"
  />
</template>

<script>
  export default {
    data() {
      return {
        currencies: [],
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
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.row {
  display: flex;
  justify-content: center;
}

.row > div {
  padding: 10px;
}
</style>
