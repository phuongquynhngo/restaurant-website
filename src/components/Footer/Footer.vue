<template>
  <div class="footer-wrapper" @click="cartShowStore.shown = true">
    <div class="cart-icon">
      <CartIcon />
      <div class="items-number">{{ numberSelectedItems }}</div>
    </div>

    <div class="sum-order">Deine Bestellung: {{ totalSum }} €</div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import CartIcon from "./icons/cart.svg?component";
import { useCartShowStores } from "../../stores/cartShowStores";
import { useBasketStore } from "../../stores/basketStore";


let cartShowStore = useCartShowStores();

const basketStore = useBasketStore();

const numberSelectedItems = computed(() => {
  console.log(basketStore.calculateSelectedItemsCount);
  return basketStore.calculateSelectedItemsCount;
});
const totalSum = computed(() => basketStore.calculateTotalSum);

</script>
<style scoped lang="scss">
@import "./footer.scss";
</style>
