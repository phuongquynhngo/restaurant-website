<template>
  <div class="wrapper">
    <div class="navbar-wrapper" :class="{ 'fixed-navbar': isNavbarFixed }">
      <NavbarMenu />
    </div>
    <div class="content">
      <Menu />
      <Cart v-if="cartShowStore.shown || !isSmallScreenStore.smallScreen" />
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
let isSmallScreenStore =  useIsSmallScreenStore();

import { useCartShowStores } from "../stores/cartShowStores";
let cartShowStore = useCartShowStores();

const scrollPosition = ref(0); //track the scroll position
const isNavbarFixed = ref(false);

const headerHeightStore = useHeaderHeightStore();
const headerHeight = headerHeightStore.getHeaderHeight; // access the headerHeight value from the useHeaderHeightStore

const handleScroll = () => {
  // Update the isNavbarFixed variable based on the scroll position
  scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
  isNavbarFixed.value = headerHeight !== null && scrollPosition.value > headerHeight;
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
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
}

.fixed-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}

.cart-visible {
  flex: 1; /* Expand to fill available space */
}

/* Apply styles for small screens */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .cart-visible {
    order: 1; /* Place the cart below the menu */
  }
}
</style>
