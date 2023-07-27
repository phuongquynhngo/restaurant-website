<template>
  <div class="navbar-header-wrapper">
    <div class="close-icon-wrapper">
      <CloseIcon class="close-icon" @click="$emit('close')" />
    </div>
    <div class="navbar-header-items">
      <RouterLink class="navbar-header-item" to="/about" @click="$emit('close')"
        ><div class="navbar-header-item-label">About</div></RouterLink
      >

      <RouterLink class="navbar-header-item" to="/" @click="$emit('close')">
        <div class="navbar-header-item-label">Menu</div></RouterLink
      >

      <RouterLink class="navbar-header-item" to="/contact" @click="$emit('close')">
        <div class="navbar-header-item-label">Contact</div></RouterLink
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import CloseIcon from "./icons/close.svg?component";
</script>
<style scoped lang="scss">
@import "./navbarHeader.scss";
</style>
