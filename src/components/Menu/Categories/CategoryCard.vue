<template>
  <div class="categories-container">
    <div
      class="category-card"
      v-for="(category, categoryName) in itemsData.categories"
      :key="categoryName"
    >
      <div class="catergory-image">
        <img :src="category.image" alt="" />
      </div>
      <div class="catergory-name">{{ category.name }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import data from "../../../assets/data/test.json";
let itemsData: { categories: Record<string, Category> } = data;
</script>
<style scoped lang="scss">
@import "./categoryCard.scss";
</style>
