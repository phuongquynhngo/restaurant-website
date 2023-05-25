<template>
  <div class="footer-wrapper">
    <div class="cart-icon">
      <CartIcon />
      <div class="items-number">2</div>
    </div>

    <div class="sum-order">Deine Bestellung + "Summe"</div>
  </div>
</template>
<script setup lang="ts">
import CartIcon from "./icons/cart.svg?component";
</script>
<style scoped lang="scss">
@import "./footer.scss";
</style>
