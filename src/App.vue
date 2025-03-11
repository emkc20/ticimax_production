<template>
  <div id="app">
    <div>
      {{ products }}
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      name: 'ilah',
      products: []
    }
  },
  async mounted() {
    const test = await this.$axios.get('');
    console.log('test', test);

  },
  methods: {},
  computed: {
    products() {
      return this.$store.getters.sort;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
