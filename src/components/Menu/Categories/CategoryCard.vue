<template>
  <div class="categories-container">
    <div class="category-card">
      <div class="category-image">
        <img :src="category.image" alt="" />
      </div>
      <div class="category-name">{{ category.name }}</div>
    </div>
    <ItemCard v-for="item in category.items" :key="item.id" :item="item" />
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import ItemCard from "../Items/ItemCard.vue";

const props = defineProps({
  category: Object,
});
</script>
<style scoped lang="scss">
@import "./categoryCard.scss";
</style>
