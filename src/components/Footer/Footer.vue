<template>
  <div class="footer-wrapper"  @click="cartShowStore.shown = true">
    <div class="cart-icon">
      <CartIcon />
      <div class="items-number">2</div>
    </div>

    <div class="sum-order">Deine Bestellung + "Summe"</div>
  </div>
</template>
<script setup lang="ts">
import CartIcon from "./icons/cart.svg?component";
import { useCartShowStores } from "../../stores/cartShowStores";


let cartShowStore = useCartShowStores();

</script>
<style scoped lang="scss">
@import "./footer.scss";
</style>
