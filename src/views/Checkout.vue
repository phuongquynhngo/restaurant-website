<template>
  <div class="checkout-wrapper">
    <div class="checkout-container">
      <div class="checkout-infos">
        <div class="checkout-header">
          <h2>Checkout</h2>
        </div>

        <!-- Customer Information -->
        <div class="customer-info">
          <label for="name">Name *</label>
          <input v-model="order.name" type="text" id="name" required />

          <label for="email">Email *</label>
          <input v-model="order.email" type="email" id="email" required />

          <label for="address">Delivery address *</label>
          <input v-model="order.address" type="text" id="address" required />
        </div>

        <!-- Payment Method Selection -->
        <div class="payment-method">
          <label for="payment">Payment Method</label>
          <select id="payment">
            <!-- <select v-model="selectedPayment" id="payment"> -->
            <option value="cash">Cash</option>
            <!-- <option value="card">Card</option> -->
          </select>
        </div>

        <!-- Proceed to Payment Button -->
        <div class="checkout-actions">
          <button @click="createNewOrder">Place your order</button>
        </div>
      </div>

      <div class="cart-footer">
        <CartFooter v-if="isSmallScreenStore.smallScreen" />
      </div>
    </div>

    <!-- Order Summary -->
    <div v-if="!isSmallScreenStore.smallScreen">
      <!-- Display order summary -->
      <Cart class="checkout-summary" />
    </div>
    <div v-if="isSmallScreenStore.smallScreen && cartShowStore.shown">
      <!-- Display order summary -->
      <Cart class="checkout-summary-smallScreen" />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { reactive } from "vue";
import api from "../composable/api.ts";
import Cart from "../components/Cart/Cart.vue";
import CartFooter from "../components/CartFooter/CartFooter.vue";
//import { useVuelidate } from "@vuelidate/cor";
import { OrderItem } from "../models/OrderItem";

import { useRouter } from 'vue-router';
const router = useRouter();

import { useIsSmallScreenStore } from "../stores/isSmallScreenStore";
let isSmallScreenStore = useIsSmallScreenStore();

import { useCartShowStores } from "../stores/cartShowStores";
let cartShowStore = useCartShowStores();

import { useBasketStore } from "../stores/basketStore";
const basketStore = useBasketStore();



// Initialize customer object with empty values
const order = reactive({
  name: "",
  email: "",
  address: "",
  products: [] as OrderItem[],
});

// const selectedPayment = ref('cash');

// Function to place order
const createNewOrder = async () => {
  try {
    // Add items and quantities from groupedItems to products array
    for (const groupedItem of basketStore.getGroupedItems) {
      const item = {
        itemId: groupedItem.id,
        quantity: groupedItem.quantity ?? 1,
      };
      order.products.push(item);
      // console.log(order.products);
    }

    const res = await api.post("/api/orders", {
      customerName: order.name,
      customerEmail: order.email,
      customerAddress: order.address,
      products: order.products,
    });
   
    // Handle success, e.g., show a success message
    if (res.data.success) {
      console.log("Order created successfully", res.data);
      basketStore.clearItems();
      order.name = "";
      order.email = "";
      order.address = "";

      // Redirect to the confirmation page
      router.push({ name: 'OrderConfirmation' });
    }
  } catch (error) {
    // Handle error, e.g., show an error message
    console.error("Error creating order", error);
  }
};

</script>

<style scoped lang="scss">
// @import "./checkout.scss";
.checkout-wrapper {
  display: grid;
  grid-template-columns: 1fr auto; /* The first column takes up all available space, the second column adjusts to content width */
  gap: 1rem;
  padding-bottom: 10rem; 
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
  @media only screen and (max-width: 1280px) {
        padding-bottom: 15rem; 
      }
  
}

.checkout-infos {
  margin: 0 2rem;
}
.customer-info {
  margin-bottom: 2rem;

  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333; /* Darken the label color */
  }

  input {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: border-color 0.3s;
    color: #555; /* Darken the text color */

    &:focus {
      outline: none;
      border-color: #155264; /* Change border color on focus */
    }
  }
}

.payment-method {
  margin-bottom: 2rem;

  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  select {
    width: 120px;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #555;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #155264;
    }
  }
}

/* Style the Proceed to Payment button */
.checkout-actions {
  text-align: right;
  margin-top: 1rem;
  button {
    padding: 1rem 2rem;
    background-color: #2c6373;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #155264;
    }
  }
}
</style>
