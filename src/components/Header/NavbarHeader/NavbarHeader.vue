<template>
  <div class="navbar-header-wrapper">
    <div class="close-icon-wrapper">
      <CloseIcon class="close-icon" @click="$emit('close')" />
    </div>
    <div class="navbar-header-items">
      <div>
        <RouterLink class="navbar-header-item" to="/about" @click="$emit('close')"
          >About</RouterLink
        >
      </div>
      <div>
        <RouterLink class="navbar-header-item" to="/" @click="$emit('close')"
          >Menükarte</RouterLink
        >
      </div>

      <div>
        <RouterLink class="navbar-header-item" to="/contact" @click="$emit('close')"
          >Kontaktdaten</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CloseIcon from "./icons/close.svg?component";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style scoped lang="scss">
@import "./navbarHeader.scss";
</style>
