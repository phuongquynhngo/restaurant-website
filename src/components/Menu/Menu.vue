<template>
  <div class="menu-wrapper">
    <div class="categories">
      <CategoryCard v-for="category in  itemsData.categories" :key="category.id" :category="category" />
      <!-- <CategoryCard/> -->
      
    </div>
  </div>
</template>
<script setup lang="ts">

import CategoryCard from "./Categories/CategoryCard.vue";

import data from "../../assets/data/test.json";
let itemsData: { categories: Record<string, Category> } = data;

</script>
<style scoped lang="scss">
@import "./menu.scss";
</style>
