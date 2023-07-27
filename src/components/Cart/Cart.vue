<template>
  <div class="order-wrapper">
    <div class="order-header">Deine Bestellung</div>
    <hr />
    <div class="close-icon" @click="cartShowStore.shown = false">
      <CloseIcon />
    </div>

    <div class="order-empty-cart" v-if="sortedSelectedItems.length === 0">
      <div class="cart-icon">
        <CartIcon />
      </div>
      <div>Wähle leckere Gerichte aus der Karte und bestelle dein Menü.</div>
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
          <div class="group-item-price">{{ item.totalPrice?.toFixed(2) }} €</div>
          <div class="delete-btn" @click="removeItem(item)"><TrashIcon /></div>
        </div>
      </div>

      <hr />
    </div>

    <div class="cart-sum" v-if="sortedSelectedItems.length > 0">
      <div class="cart-sum-row cart-sum-subtotal">
        <div class="cart-sum-name">Zwischensumme</div>
        <div class="cart-sum-price">{{ totalSum }} €</div>
      </div>
      <div class="cart-sum-row cart-sum-delivery-costs">
        <div class="cart-sum-name">Lieferkosten</div>
        <div class="cart-sum-price">Kostenlos</div>
      </div>
      <div class="cart-sum-row cart-sum-total">
        <div class="cart-sum-name">Gesamt</div>
        <div class="cart-sum-price">{{ totalSum.toFixed(2) }} €</div>
      </div>
    </div>

    <!-- <div class="order-checkout-btn">Bestellen</div> -->
    <RouterLink
      class="order-checkout-btn"
      v-if="sortedSelectedItems.length > 0"
      to="/checkout"
      @click="cartShowStore.shown = false"
    >
      <div>Weiter zum Bestellen</div></RouterLink
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import CartIcon from "../Footer/icons/cart.svg";
import CloseIcon from "../Header/NavbarHeader/icons/close.svg";
import TrashIcon from "./icons/trash.svg";
import { useCartShowStores } from "../../stores/cartShowStores";
import { useBasketStore } from "../../stores/basketStore";
import { Item } from "../../models/Item";

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
</script>
<style scoped lang="scss">
@import "./cart.scss";
</style>
