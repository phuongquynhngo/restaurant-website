<template>
  <div
    class="menu-wrapper"
    ref="menuWrapperRef"
    @scroll="handleMenuScroll(menuWrapperRef.value)"
  >
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
import { ref, watch, onMounted } from "vue";
import CategoryCard from "./Categories/CategoryCard.vue";
import { useFocusedCategoryStore } from "../../stores/forcusCategoryStore";
import { useActiveCategoryStore } from "../../stores/activeCategoryStore";

import data from "../../assets/data/test.json";
// import { eventBus } from "../../eventBus/eventBus.js";
let itemsData: { categories: Record<string, Category> } = data;

const forcusCategoryStore = useFocusedCategoryStore();
const activeCategoryStore = useActiveCategoryStore();
const menuWrapperRef = ref<HTMLDivElement | null>(null);

// update store of  activeCategoryStore to the active category tag when scrolling vertically
const handleMenuScroll = () => {
  const windowHeight = window.innerHeight;
  let maxVisibleHeight = 0;
  let visibleCategory = null;

  for (
    let category = 1;
    category <= Object.keys(itemsData.categories).length;
    category++
  ) {
    const categoryElement = document.getElementById(`category-${category}`);
    if (!categoryElement) continue;

    const categoryRect = categoryElement.getBoundingClientRect();
    const categoryTop = categoryRect.top;
    const categoryBottom = categoryRect.bottom;

    let categoryVisibleTop = Math.max(categoryTop, 0);
    let categoryVisibleBottom = Math.min(categoryBottom, windowHeight);

    if (categoryVisibleTop < categoryVisibleBottom) {
      const categoryVisibleHeight = categoryVisibleBottom - categoryVisibleTop;

      if (categoryVisibleHeight > maxVisibleHeight) {
        maxVisibleHeight = categoryVisibleHeight;
        visibleCategory = parseInt(category);
      }
    }
  }

  if (visibleCategory !== null) {
    activeCategoryStore.setActiveCategoryId(visibleCategory);
  }
};

onMounted(() => {
  const menuWrapper = menuWrapperRef.value;
  if (menuWrapper) {
    window.addEventListener("scroll", handleMenuScroll);
  }
});

//using the watch function to track changes to the focusedCategoryId in the activeCategoryStore
watch(
  () => forcusCategoryStore.getFocusedCategoryId,
  (categoryId) => {
    const targetDiv = document.getElementById(categoryId);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  }
);
</script>
<style scoped lang="scss">
@import "./menu.scss";
</style>
