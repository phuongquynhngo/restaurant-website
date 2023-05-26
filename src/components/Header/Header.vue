<template>
  <div class="header-wrapper">
  <div class="header-container">
    <div class="logo-name">
      <div class="logo">
      <img src="../../assets/photos/logo.jpg" alt=""></div>
      <div class="name">
       Viet Quan
       <br/>
       Asia Imbiss Duisburg
      </div>
    </div>
    <div @click="isActive = true"><MenuIcon  class="sidebar-icon" /></div>
  </div>
</div>
  <div class="navbar-header" v-show="isActive"> <NavbarHeader  @close="isActive = false" /></div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import MenuIcon from "./icons/menu.svg?component";
import NavbarHeader from "./NavbarHeader/NavbarHeader.vue";
const isActive = ref<boolean>(false);
</script>
<style scoped lang="scss">
@import "./header";
</style>
