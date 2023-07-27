<template>
  <div class="wrapper">
    <div class="navbar-wrapper" :class="{ 'fixed-navbar': isNavbarFixed }">
      <NavbarMenu />
    </div>
    <Menu />
     <Footer />
    <Cart v-if="cartShowStore.shown" /> 
  </div>
</template>

<script setup lang="ts">
import NavbarMenu from "../components/NavbarMenu/NavbarMenu.vue";
import Menu from "../components/Menu/Menu.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useHeaderHeightStore } from "../stores/headerHeightStore";
import Footer from "../components/Footer/Footer.vue";
import Cart from "../components/Cart/Cart.vue";
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
  // height: 100%;
  box-sizing: border-box;
}

.fixed-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>
