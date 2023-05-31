<template>
  <div class="menu-wrapper">
    <div class="categories">
      <CategoryCard
        v-for="category in itemsData.categories"
        :key="category.id"
        :category="category"
        :id="'category-' + category.id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import CategoryCard from "./Categories/CategoryCard.vue";

import data from "../../assets/data/test.json";
import { eventBus } from "../../eventBus/eventBus.js";
let itemsData: { categories: Record<string, Category> } = data;



onMounted(() => {  // listen for the eventBus and scroll to the desired category
  eventBus.on("focus-category", (catergoryId) => {
    const targetDiv = document.getElementById(catergoryId);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  });
});
</script>
<style scoped lang="scss">
@import "./menu.scss";
</style>
