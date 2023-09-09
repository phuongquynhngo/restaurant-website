<script setup lang="ts">
import api from "./composable/api";
import { ref, provide, onBeforeMount } from "vue";
import Header from "./components/Header/Header.vue";
import { Category } from "./models/Category.ts";
import { Item } from "./models/Item.ts";

import { useIsSmallScreenStore } from "./stores/isSmallScreenStore";
let isSmallScreenStore =  useIsSmallScreenStore();

// Detect if the screen is small
const checkScreenSize = () => {
  isSmallScreenStore.smallScreen = window.innerWidth <= 1280; // Adjust the breakpoint as needed
};

// Check the screen size initially and on window resize
checkScreenSize();
window.addEventListener("resize", checkScreenSize);

let categoriesData = ref<Category[]>([]);
const fetchCategories = async () => {
  try {
    const response = await api.get("/api/categories/");
    categoriesData.value = response.data;
    console.log("categories:", categoriesData.value);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
};
let itemsData = ref<Item[]>([]);
const fetchItems = async () => {
  try {
    const response = await api.get("/api/items/");
    itemsData.value = response.data;
    console.log("items:", itemsData.value);
  } catch (error) {
    console.log("Error fetching items:", error);
  }
};
onBeforeMount(async () => {
  await Promise.all([fetchCategories(), fetchItems()]);
});

provide("Items", itemsData);
provide("Categories", categoriesData);


</script>

<template>
  <div class="container">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0;
  box-sizing: border-box; //set the box-sizing property to border-box to include padding and borders
}
</style>
./composable/api.ts