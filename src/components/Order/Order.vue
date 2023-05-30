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
      <div class="cart-item">
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
      </div>

      <div class="cart-item">
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
      </div>
      <hr />
    </div>

    <div class="cart-sum">
      <div class="cart-sum-row cart-sum-subtotal">
        <div class="cart-sum-name">Zwischensumme</div>
        <div class="cart-sum-price">56,30 €</div>
      </div>
      <div class="cart-sum-row cart-sum-delivery-costs">
        <div class="cart-sum-name">Lieferkosten</div>
        <div class="cart-sum-price">Kostenlos</div>
      </div>
      <div class="cart-sum-row cart-sum-total">
        <div class="cart-sum-name">Gesamt</div>
        <div class="cart-sum-price">56,30 €</div>
      </div>
    </div>

    <div class="order-checkout-btn">Bestellen</div>
  </div>
</template>
<script setup lang="ts">
import CartIcon from "../Footer/icons/cart.svg";
import CloseIcon from "../Header/NavbarHeader/icons/close.svg?component";
import TrashIcon from "./icons/trash.svg?component";
import { useCartShowStores } from "../../stores/cartShowStores";


let cartShowStore = useCartShowStores();
</script>
<style scoped lang="scss">
@import "./order.scss";
</style>
