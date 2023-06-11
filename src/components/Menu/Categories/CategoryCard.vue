<template>
  <div class="categories-container">
    <!-- <div
      class="category-card"
      v-for="(category, categoryName) in itemsData.categories"
      :key="categoryName"
    > -->

    <div class="category-card">
      <div class="category-image">
        <img :src="category.image" alt="" />
      </div>
      <div class="category-name">{{ category.name }}</div>
    </div>
    <ItemCard v-for="item in category.items" :key="item.id" :item="item"  @add-item-to-basket="addToBasket(item)" />
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ItemCard from "../Items/ItemCard.vue";

const emit = defineEmits(["add-to-basket"]);

// import data from "../../../assets/data/test.json";
// let itemsData: { categories: Record<string, Category> } = data;

const props = defineProps({
  category: Object,
});
// Function to handle adding item to the basket
function addToBasket(item) {
  console.log("hi",item);
  // Handle the logic to add the item to the basket here
  emit("add-to-basket", item);
}
</script>
<style scoped lang="scss">
@import "./categoryCard.scss";
</style>
