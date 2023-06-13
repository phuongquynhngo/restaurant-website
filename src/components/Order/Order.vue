<template>
  <div class="order-wrapper">
   
    <div class="order-header">Deine Bestellung</div>
    <hr />
    <div class="close-icon" @click="cartShowStore.shown = false">
      <CloseIcon />
    </div>

    <div class="order-empty-cart">
      <div class="cart-icon">
        <CartIcon />
      </div>
      <div>Wähle leckere Gerichte aus der Karte und bestelle dein Menü.</div>
    </div>
   

    <div class="order-cart-details">
      <div class="cart-item"  v-for="item in selectedItems" :key="item.id">
        <div class="item-amount-name">
          <div class="item-amount">{{ item.quantity }} x</div>
          <div class="item-name">{{ item.name }}</div>
        </div>
        <div class="item-edit">
          <div class="item-amount-edit">
            <div class="edit-amount-btn" @click="decrementQuantity(item)">-</div>
            <div class="edit-amount-btn" @click="incrementQuantity(item)">+</div>
          </div>
          <div class="item-price">{{ item.totalPrice }}  €</div>
          <div class="delete-btn" @click="removeItem(item)"><TrashIcon /></div>
        </div>
      </div>

      <!-- <div class="cart-item">
        <div class="item-amount-name">
          <div class="item-amount">1 x</div>
          <div class="item-name">Meal name</div>
        </div>
        <div class="item-edit">
          <div class="item-amount-edit">
            <div class="edit-amount-btn">-</div>
            <div class="edit-amount-btn">+</div>
          </div>
          <div class="item-price">1,00 €</div>
          <div class="delete-btn"><TrashIcon /></div>
        </div>
      </div> -->

      <hr />
    </div>

    <div class="cart-sum">
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
        <div class="cart-sum-price">{{ totalSum }} €</div>
      </div>
    </div>

    

    <div class="order-checkout-btn">Bestellen</div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import CartIcon from "../Footer/icons/cart.svg";
import CloseIcon from "../Header/NavbarHeader/icons/close.svg?component";
import TrashIcon from "./icons/trash.svg?component";
import { useCartShowStores } from "../../stores/cartShowStores";
import { useBasketStore } from "../../stores/basketStore";

let cartShowStore = useCartShowStores();

const basketStore = useBasketStore();

// const selectedItems = computed(() => {
//   const groupedItems = basketStore.getSelectedItems.reduce((accumulator, item) => {
//     const existingItem = accumulator.find((el) => el.id === item.id);
//     if (existingItem) {
//       existingItem.quantity++;
//       existingItem.totalPrice += parseFloat(item.price.toFixed(2)); // round the item.price to two decimal places and then convert it to a floating-point number
//     } else {
//       accumulator.push({ ...item, quantity: 1, totalPrice: parseFloat(item.price.toFixed(2)) });
//     }
//     return accumulator;
//   }, []);
//   return groupedItems;
// });

const selectedItems = computed(() => {
  const groupedItems = basketStore.getSelectedItems.reduce((accumulator, item) => {
    const existingItem = accumulator.find((el) => el.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice += parseFloat(item.price.toFixed(2));
    } else {
      const newItem = {
        ...item,
        quantity: 1,
        totalPrice: parseFloat(item.price.toFixed(2)),
      };
      accumulator.push(newItem);
    }

    return accumulator;
  }, []);

  return groupedItems;
});


const totalSum = computed(() => basketStore.calculateTotalSum);

const incrementQuantity = (item) => {
  basketStore.addItem(item);
  console.log(basketStore.getSelectedItems);
};

const decrementQuantity = (item) => {
  basketStore.removeItem(item);
};

const removeItem = (item) => {
  // console.log(basketStore.getSelectedItems);
  basketStore.removeItem(item);
};
</script>
<style scoped lang="scss">
@import "./order.scss";
</style>
