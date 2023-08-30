<template>
  <div class="wrapper">
    <div class="navbar-wrapper" :class="{ 'fixed-navbar': isNavbarFixed }">
      <NavbarMenu />
    </div>
    <div class="content" v-if="!isSmallScreenStore.smallScreen">
      <div class="menu-column">
        <Menu />
      </div>
      <div class="cart-container">
      <div class="cart-column">
        <Cart :class="{ 'fixed-cart': isCartFixed }" />
      </div>
    </div>
    </div>
    <div v-if="isSmallScreenStore.smallScreen">
      <Menu />
      <Cart v-if="cartShowStore.shown" />
    </div>
    <Footer v-if="isSmallScreenStore.smallScreen" />
  </div>
</template>

<script setup lang="ts">
import NavbarMenu from "../components/NavbarMenu/NavbarMenu.vue";
import Menu from "../components/Menu/Menu.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useHeaderHeightStore } from "../stores/headerHeightStore";
import Footer from "../components/Footer/Footer.vue";
import Cart from "../components/Cart/Cart.vue";

import { useIsSmallScreenStore } from "../stores/isSmallScreenStore";
let isSmallScreenStore = useIsSmallScreenStore();

import { useCartShowStores } from "../stores/cartShowStores";
let cartShowStore = useCartShowStores();

const scrollPosition = ref(0); //track the scroll position
const isNavbarFixed = ref(false);

const headerHeightStore = useHeaderHeightStore();
const headerHeight = headerHeightStore.getHeaderHeight; // access the headerHeight value from the useHeaderHeightStore
const isCartFixed = ref(false); // Track cart's fixed status
const handleScroll = () => {
  // Update the isNavbarFixed variable based on the scroll position
  scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
  isNavbarFixed.value = headerHeight !== null && scrollPosition.value > headerHeight;
  // Update isCartFixed based on the scroll position
  isCartFixed.value = scrollPosition.value > (headerHeight || 0);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh; /* Ensure the content takes at least the full viewport height */
  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 5px;
    align-items: flex-start;
    flex: 1;
  
  }
}

.fixed-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}
.fixed-cart {
  position: fixed;
  width: 33vw;
  top: 60px;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
}
</style>
