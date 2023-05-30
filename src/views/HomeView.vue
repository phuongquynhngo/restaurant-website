<template>
  <div class="wrapper">
    <NavbarMenu />
    <Menu />
    <Footer />
    <Order v-if="cartShowStore.shown" />
  </div>
</template>
<script setup lang="ts">
import Footer from "../components/Footer/Footer.vue";
import NavbarMenu from "../components/NavbarMenu/NavbarMenu.vue";
import Menu from "../components/Menu/Menu.vue";
import Order from "../components/Order/Order.vue";
import { useCartShowStores } from "../stores/cartShowStores";


let cartShowStore = useCartShowStores();
</script>
<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
