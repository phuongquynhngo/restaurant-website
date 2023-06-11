<template>
  <div class="menu-wrapper" ref="menuWrapperRef" @scroll="handleMenuScroll(menuWrapperRef.value)">
    <div class="categories"  >
      <CategoryCard
        v-for="category in itemsData.categories"
        :key="category.id"
        :category="category"
        :id="'category-' + category.id"
        @add-to-basket=" addToBasket"
       
      />
    </div>
    <div v-for="item in selectedItems" :key="item.id">
      <!-- Display the selected items -->
      {{ item.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, computed} from "vue";
import CategoryCard from "./Categories/CategoryCard.vue";
import { useFocusedCategoryStore } from "../../stores/forcusCategoryStore";
import { useActiveCategoryStore } from "../../stores/activeCategoryStore";
import { useBasketStore  } from "../../stores/basketStore";


import data from "../../assets/data/test.json";
// import { eventBus } from "../../eventBus/eventBus.js";
let itemsData: { categories: Record<string, Category> } = data;


const forcusCategoryStore = useFocusedCategoryStore();
const activeCategoryStore = useActiveCategoryStore();
const menuWrapperRef = ref<HTMLDivElement | null>(null);


const basketStore = useBasketStore();

const selectedItems = computed(() => {
  console.log(basketStore.getSelectedItems);
  return basketStore.getSelectedItems;

});

// update store of  activeCategoryStore to the active category tag when scrolling vertically
const handleMenuScroll = () => {
  const windowHeight = window.innerHeight;
  let maxVisibleHeight = 0;
  let visibleCategory = null;

  for (let category = 1; category <= Object.keys(itemsData.categories).length; category++) {
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
    // console.log(visibleCategory);
    activeCategoryStore.setActiveCategoryId(visibleCategory);
  }
};



onMounted(() => {
  // console.log(menuWrapperRef.value);
  const menuWrapper = menuWrapperRef.value;
  // console.log(menuWrapper);
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



const addToBasket = (item) => {
  console.log("Selected item:", item);
  // You can perform any further actions with the selected item here
};
</script>
<style scoped lang="scss">
@import "./menu.scss";
</style>
