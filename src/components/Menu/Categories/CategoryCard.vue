<template>
  <div class="categories-container">
    <div class="category-card">
      <div class="category-image">
        <img :src="category?.image" alt="" />
      </div>
      <div class="category-name">{{ category?.name }}</div>
    </div>
    <ItemCard v-for="item in filteredItems" :key="item.id" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { inject } from "@vue/runtime-core";
import ItemCard from "../Items/ItemCard.vue";
import { Category } from "../../../models/Category";
import { Item } from "../../../models/Item";

const { category } = defineProps({
  category: Object as () => Category | null,
});

const itemsData = inject("Items") as Item[] | null;
const itemsRef = ref(itemsData); //access the array without the Proxy wrapper
const items = itemsRef.value;
//console.log('items:', items);

// Filter items based on category.id
const filteredItems = items ? items.filter((item) => item.category_id === category?.id) : [];
</script>

<style scoped lang="scss">
@import "./categoryCard.scss";
</style>
