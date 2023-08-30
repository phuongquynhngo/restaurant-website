<template>
  <div class="menu-wrapper" ref="menuWrapperRef" @scroll="handleMenuScroll">
    <div class="categories">
      <CategoryCard v-for="category in categoriesData" :key="category.id" :category="category" :id="'category-' + category.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { inject } from "@vue/runtime-core";
import CategoryCard from "./Categories/CategoryCard.vue";
import { useFocusedCategoryStore } from "../../stores/focusCategoryStore";
import { useActiveCategoryStore } from "../../stores/activeCategoryStore";
import { Category } from "../../models/Category.ts";
// import { eventBus } from "../../eventBus/eventBus.js";

// import data from "../../assets/data/test.json";

const categoriesInject = inject("Categories") as Category[] | null;
const categoriesRef = ref(categoriesInject); //access the array without the Proxy wrapper
const categoriesData = categoriesRef.value;
//console.log('categoriesData:', categoriesData);

const focusCategoryStore = useFocusedCategoryStore();
const activeCategoryStore = useActiveCategoryStore();
const menuWrapperRef = ref<HTMLDivElement | null>(null);

// update store of  activeCategoryStore to the active category tag when scrolling vertically
const handleMenuScroll = () => {
  if (categoriesData) {
    // Check if categoriesData is not null
    const windowHeight = window.innerHeight;
    let maxVisibleHeight = 0;
    let visibleCategory = null;

    for (const category of categoriesData) {
      const categoryElement = document.getElementById(`category-${category.id}`);
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
          visibleCategory = category.id;
        }
      }
    }

    if (visibleCategory !== null) {
      activeCategoryStore.setActiveCategoryId(visibleCategory);
    }
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
  () => focusCategoryStore.getFocusedCategoryId,
  (categoryId) => {
    const targetDiv = document.getElementById(categoryId ?? "");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  }
);
</script>
<style scoped lang="scss">
@import "./menu.scss";
</style>
