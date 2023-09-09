<template>
  <div
    class="order-wrapper"
    :class="{
      'small-screen-order-wrapper': isSmallScreenStore.smallScreen,
    }"
  >
    <div class="order-header">Your Order</div>
    <hr />
    <div v-if="isSmallScreenStore.smallScreen" class="close-icon" @click="cartShowStore.shown = false">
      <CloseIcon />
    </div>

    <div class="order-empty-cart" v-if="sortedSelectedItems.length === 0">
      <div class="cart-icon">
        <CartIcon />
      </div>
      <div>Select delicious dishes from the menu and place your order.</div>
    </div>

    <div class="order-cart-details" v-else>
      <div class="cart-item" v-for="item in sortedSelectedItems" :key="item.id">
        <div class="item-amount-name">
          <div class="item-amount">{{ item.quantity }}</div>
          <div>x</div>
          <div class="item-name">{{ item.name }}</div>
        </div>
        <div class="item-edit">
          <div class="item-amount-edit">
            <div class="edit-amount-btn" @click="decrementQuantity(item)">-</div>
            <div class="edit-amount-btn" @click="incrementQuantity(item)">+</div>
          </div>
          <div class="group-item-price">{{ Number(item.totalPrice).toFixed(2) }} €</div>
          <div class="delete-btn" @click="removeItem(item)"><TrashIcon /></div>
        </div>
      </div>

      <hr />
    </div>

    <div class="cart-sum" v-if="sortedSelectedItems.length > 0">
      <div class="cart-sum-row cart-sum-subtotal">
        <div class="cart-sum-name">Subtotal</div>
        <div class="cart-sum-price">{{ totalSum }} €</div>
      </div>
      <div class="cart-sum-row cart-sum-delivery-costs">
        <div class="cart-sum-name">Delivery Costs</div>
        <div class="cart-sum-price">Free</div>
      </div>
      <div class="cart-sum-row cart-sum-total">
        <div class="cart-sum-name">Total</div>
        <div class="cart-sum-price">{{ totalSum.toFixed(2) }} €</div>
      </div>
    </div>

    <!-- <div class="order-checkout-btn">Bestellen</div> -->
    <RouterLink
      class="order-checkout-btn"
      v-if="sortedSelectedItems.length > 0 && $route.path == '/'"
      :to="sortedSelectedItems.length > 0 && totalSum > 15 ? '/checkout' : ''"
      @click="showMessageNotQualifiedOrToCheckout"
    >
      <div>Continue to checkout</div></RouterLink
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import CartIcon from "../Footer/icons/cart.svg";
import CloseIcon from "../Header/NavbarHeader/icons/close.svg";
import TrashIcon from "./icons/trash.svg";
import { useIsSmallScreenStore } from "../../stores/isSmallScreenStore";
import { useCartShowStores } from "../../stores/cartShowStores";
import { useBasketStore } from "../../stores/basketStore";
import { Item } from "../../models/Item";

let isSmallScreenStore = useIsSmallScreenStore();
let cartShowStore = useCartShowStores();
const basketStore = useBasketStore();

// prevent the order of items from changing when the quantity of grouped items changes.
const sortedSelectedItems = computed(() => {
  const items = basketStore.getGroupedItems;
  return items.slice().sort((a, b) => a.id - b.id); //sorting by item identifier: compare the id values:
  //if the result is negative, a should come before b, and if the result is positive, b should come before a.
  //If the result is 0, the items have the same id and their order remains unchanged.
  //slice() method on items: creates a copy of the array to avoid modifying the original one.
});

const totalSum = computed(() => basketStore.calculateTotalSum);

const incrementQuantity = (item: Item) => {
  basketStore.addItem(item);
  // console.log(basketStore.getGroupedItems);
};

const decrementQuantity = (item: Item) => {
  basketStore.removeItem(item);
};

const removeItem = (item: Item) => {
  basketStore.removeItem(item);
};

const showMessageNotQualifiedOrToCheckout = () => {
  if (totalSum.value < 15) {
    // Show a message to the user that the total is not enough for checkout
    alert("Minimum order for checkout is 15 euros.");
  } else {
    cartShowStore.shown = false;
  }
};
</script>
<style scoped lang="scss">
@import "./cart.scss";
.small-screen-order-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
