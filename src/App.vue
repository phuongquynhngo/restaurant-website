<script setup lang="ts">
import Header from "./components/Header/Header.vue";
</script>

<template>
  <div class="container">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0;
  box-sizing: border-box; //set the box-sizing property to border-box to include padding and borders
}
</style>
