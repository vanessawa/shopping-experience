<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <article v-for="item in res" :key="item.id">
    <p v-text="item.id"></p>
    <p v-text="item.title"></p>
    <p v-text="item.price"></p>
  </article>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      res: {},
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => (this.res = data))
      .then((json) => console.log(json));
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
