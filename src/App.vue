<script setup lang="ts">
import Footer from "./components/Footer/Footer.vue";
import Cart from "./components/Cart/Cart.vue";
import { useCartShowStores } from "./stores/cartShowStores";
import { useRoute } from "vue-router";
import Header from "./components/Header/Header.vue";

let cartShowStore = useCartShowStores();

const route = useRoute();
</script>

<template>
  <div class="container">
    <Header />
    <RouterView />
    <Footer />
    <Cart v-if="cartShowStore.shown" />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0;
  box-sizing: border-box; //set the box-sizing property to border-box to include padding and borders
}
</style>
