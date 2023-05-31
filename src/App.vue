 <script setup lang="ts">
import { useRoute } from "vue-router";
import Header from "./components/Header/Header.vue";

const route = useRoute();
</script>

<template>
  <div class="container">
    <Header/>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  // max-width: 100%;
  margin: 0;
  // height: 100vh;
  box-sizing: border-box; //set the box-sizing property to border-box to include padding and borders
}
</style>

