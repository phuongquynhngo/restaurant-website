<template>
  <div class="menu-wrapper">
    <div class="categories">
      <CategoryCard />
    </div>
  </div>
</template>
<script setup lang="ts">
import CategoryCard from "./Categories/CategoryCard.vue";
</script>
<style scoped lang="scss">
@import "./menu.scss";
</style>
