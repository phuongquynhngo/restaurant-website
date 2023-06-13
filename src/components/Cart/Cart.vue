<template>
  <div class="order-wrapper">
    <div class="order-header">Deine Bestellung</div>
    <hr />
    <div class="close-icon" @click="cartShowStore.shown = false">
      <CloseIcon />
    </div>

    <div class="order-empty-cart" v-if="selectedItems.length === 0">
      <div class="cart-icon">
        <CartIcon />
      </div>
      <div>Wähle leckere Gerichte aus der Karte und bestelle dein Menü.</div>
    </div>

    <div class="order-cart-details" v-else>
      <div class="cart-item" v-for="item in selectedItems" :key="item.id">
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
          <div class="group-item-price">{{ item.totalPrice.toFixed(2) }} €</div>
          <div class="delete-btn" @click="removeItem(item)"><TrashIcon /></div>
        </div>
      </div>

      <hr />
    </div>

    <div class="cart-sum" v-if="selectedItems.length > 0">
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

    <div class="order-checkout-btn">Bestellen</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import CartIcon from "../Footer/icons/cart.svg";
import CloseIcon from "../Header/NavbarHeader/icons/close.svg?component";
import TrashIcon from "./icons/trash.svg?component";
import { useCartShowStores } from "../../stores/cartShowStores";
import { useBasketStore } from "../../stores/basketStore";

let cartShowStore = useCartShowStores();
const basketStore = useBasketStore();

const selectedItems = computed(() => basketStore.getGroupedItems);
const totalSum = computed(() => basketStore.calculateTotalSum);

const incrementQuantity = (item) => {
  basketStore.addItem(item);
  // console.log(basketStore.getGroupedItems);
};

const decrementQuantity = (item) => {
  basketStore.removeItem(item);
};

const removeItem = (item) => {
  basketStore.removeItem(item);
};
</script>
<style scoped lang="scss">
@import "./cart.scss";
</style>
