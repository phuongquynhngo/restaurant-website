<template>
  <div class="header-wrapper" ref="headerRef">
    <div class="header-container">
      <div class="logo-name">
        <div class="logo">
          <img src="../../assets/photos/logo.jpg" alt="" />
        </div>
        <div class="name">
          Viet Quan
          <br />
          Asia Imbiss Duisburg
        </div>
      </div>
      <div @click="isActive = true"><MenuIcon class="sidebar-icon" /></div>
    </div>
  </div>
  <div class="navbar-header" v-show="isActive">
    <NavbarHeader @close="isActive = false" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import MenuIcon from "./icons/menu.svg?component";
import NavbarHeader from "./NavbarHeader/NavbarHeader.vue";
import { useHeaderHeightStore } from "../../stores/headerHeightStore";
const isActive = ref<boolean>(false);
const headerRef = ref(null);

const headerHeight = useHeaderHeightStore();
onMounted(() => {
  //store the headerHeight value in Pinia
  headerHeight.setHeaderHeight(headerRef.value?.clientHeight || 0);
  // const headerHeight = headerRef.value?.clientHeight || 0; //calculate the height of the header
  //?. optional chaining operator ensures that the code doesn't throw an error if headerRef.value is null or undefined.
});
</script>
<style scoped lang="scss">
@import "./header";
</style>
