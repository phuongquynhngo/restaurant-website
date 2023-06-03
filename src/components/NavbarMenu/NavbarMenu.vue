<template>
  <div class="navbar-menu-wrapper">
    <div class="slider-container">
      <div v-if="showPrevButton" class="slider-button prev" @click="slidePrev">
        <PreviousIcon />
      </div>
      <div class="c-tags" ref="cTags">
        <span
          class="tag"
          v-for="(category, categoryName) in itemsData.categories"
          :key="categoryName"
          ref="categoryTags"
          @click="focusCategory(category)"
          :id="'category-tag-' + category.id"
          :class="{ focused: activeCategory == category.id }"
          >{{ category.name }}
        </span>
      </div>
      <div v-if="showNextButton" class="slider-button next" @click="slideNext">
        <NeaxtIcon />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import data from "../../assets/data/test.json";
import NeaxtIcon from "./icons/next.svg?component";
import PreviousIcon from "./icons/previous.svg?component";
// import { eventBus } from "../../eventBus/eventBus.js";
import { useFocusedCategoryStore } from "../../stores/forcusCategoryStore";
import { useActiveCategoryStore } from "../../stores/activeCategoryStore";

// slide tags in chat item using mouse
const cTags = ref<HTMLDivElement | null>(null);
const categoryTags = ref<Array<HTMLElement | null>>([]);
const showPrevButton = ref(false);
const showNextButton = ref(false);
const isOverflow = ref(true);
let activeCategory = ref<number | null>(null);

const forcusCategoryStore = useFocusedCategoryStore();
const activeCategoryStore = useActiveCategoryStore();

let isDown = false;
let startX: number | undefined;
let scrollLeft: number | undefined;
// let isOverflow = ref(true);

let itemsData: { categories: Record<string, Category> } = ref(data);

onMounted(() => {
  cTags.value?.addEventListener("mousedown", (e: Event) => {
    const mouseEvent = e as MouseEvent;
    isDown = true;
    startX = mouseEvent.pageX - cTags.value?.offsetLeft;
    scrollLeft = cTags.value?.scrollLeft ?? 0;
  });

  cTags.value?.addEventListener("mouseleave", () => {
    isDown = false;
  });

  cTags.value?.addEventListener("mouseup", () => {
    isDown = false;
  });

  cTags.value?.addEventListener("mousemove", (e: Event) => {
    if (!isDown) return;
    e.preventDefault();
    const mouseEvent = e as MouseEvent;
    const x = mouseEvent.pageX - cTags.value?.offsetLeft;
    const walk = (x - (startX as number)) * 3; // adjust scrolling speed here
    cTags.value!.scrollLeft = (scrollLeft as number) - walk;
  });

  // Scroll event listener
  cTags.value?.addEventListener("scroll", updateOverflow);
  cTags.value?.addEventListener("scroll", handleScroll);
  // Listen for the scroll event on the window
  window.addEventListener("scroll", handleScrollTag);
  updateOverflow();
  // scrollActiveCategoryIntoView();
});

function handleScroll() {
  // Update the visibility of the slider buttons based on overflow
  const prevButton = document.querySelector(".slider-button.prev");
  const nextButton = document.querySelector(".slider-button.next");

  if (prevButton && nextButton) {
    prevButton.style.display = cTags.value?.scrollLeft === 0 ? "none" : "block";
    nextButton.style.display =
      cTags.value?.scrollLeft + cTags.value?.clientWidth >= cTags.value?.scrollWidth
        ? "none"
        : "block";
  }
  // Update the visibility of the previous button
  showPrevButton.value = cTags.value?.scrollLeft > 0;
}

// Automatically scroll the navbar horizontally to the active category tag when scrolling vertically
function handleScrollTag() {
  // Scroll the navbar to the active category tag if it's not visible
  const activeCategoryElement = document.getElementById(
    `category-tag-${activeCategory.value}`
  );
  if (activeCategoryElement) {
    const containerRect = cTags.value?.getBoundingClientRect();
    const categoryRect = activeCategoryElement.getBoundingClientRect();

    if (
      categoryRect.left < containerRect.left ||
      categoryRect.right > containerRect.right
    ) {
      const scrollLeft = categoryRect.left - containerRect.left + cTags.value?.scrollLeft;
      cTags.value?.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }
}

function updateOverflow() {
  const isScrollingLeft = cTags.value?.scrollLeft === 0;
  const isScrollingRight =
    cTags.value?.scrollLeft! + cTags.value?.clientWidth! < cTags.value?.scrollWidth!;
  const isScrollable = cTags.value?.scrollWidth! > cTags.value?.clientWidth!;

  const lastTag = categoryTags.value[categoryTags.value.length - 1];
  const isLastTagCompletelyVisible =
    lastTag && lastTag.offsetLeft + lastTag.offsetWidth <= cTags.value?.clientWidth!;

  isOverflow.value = isScrollingLeft || isScrollingRight || !isScrollable;
  showNextButton.value = isScrollingRight && !isLastTagCompletelyVisible;
}

// function slidePrev() {
//   const clientWidth = cTags.value?.clientWidth;
//   const currentScrollLeft = cTags.value?.scrollLeft;

//   // Find the previous category tag that is currently not fully visible
//   const prevCategoryTag = categoryTags.value
//     .slice()
//     .reverse()
//     .find((tag) => {
//       if (tag) {
//         const tagLeft = tag.offsetLeft;
//         const tagRight = tagLeft + tag.offsetWidth;
//         return tagRight <= currentScrollLeft!;
//       }
//       return false;
//     });

//   if (prevCategoryTag) {
//     // Scroll to the previous category tag
//     cTags.value?.scrollTo({
//       left: prevCategoryTag.offsetLeft,
//       behavior: "smooth",
//     });
//   } else {
//     // Calculate the previous scroll position
//     const prevScrollLeft = Math.max(currentScrollLeft! - clientWidth!, 0);

//     // Scroll to the previous section
//     cTags.value?.scrollTo({
//       left: prevScrollLeft,
//       behavior: "smooth",
//     });
//   }
// }

// function slideNext() {
//   const clientWidth = cTags.value?.clientWidth;
//   const currentScrollLeft = cTags.value?.scrollLeft;

//   // Find the first category tag that is currently not fully visible
//   const nextCategoryTag = categoryTags.value.find((tag) => {
//     if (tag) {
//       const tagLeft = tag.offsetLeft;
//       return tagLeft >= currentScrollLeft! + clientWidth!;
//     }
//     return false;
//   });

//   if (nextCategoryTag) {
//     // Scroll to the next category tag
//     cTags.value?.scrollTo({
//       left: nextCategoryTag.offsetLeft,
//       behavior: "smooth",
//     });
//   } else {
//     // Calculate the next scroll position
//     const nextScrollLeft = currentScrollLeft! + clientWidth!;

//     // Scroll to the next section
//     cTags.value?.scrollTo({
//       left: nextScrollLeft,
//       behavior: "smooth",
//     });
//   }
// }

function slidePrev() {
  const currentScrollLeft = cTags.value?.scrollLeft;

  // Find the previous category tag that is currently not fully visible
  const prevCategoryTag = categoryTags.value
    .slice()
    .reverse()
    .find((tag) => {
      if (tag) {
        const tagLeft = tag.offsetLeft;
        const tagRight = tagLeft + tag.offsetWidth;
        return tagRight <= currentScrollLeft!;
      }
      return false;
    });

  if (prevCategoryTag) {
    // Scroll to the previous category tag
    prevCategoryTag.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    // Scroll to the previous section
    cTags.value?.scrollTo({
      left: currentScrollLeft! - cTags.value!.clientWidth,
      behavior: "smooth",
    });
  }
}

function slideNext() {
  const currentScrollLeft = cTags.value?.scrollLeft;

  // Find the first category tag that is currently not fully visible
  const nextCategoryTag = categoryTags.value.find((tag) => {
    if (tag) {
      const tagLeft = tag.offsetLeft;
      return tagLeft >= currentScrollLeft! + cTags.value!.clientWidth;
    }
    return false;
  });

  if (nextCategoryTag) {
    // Scroll to the next category tag
    nextCategoryTag.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    // Scroll to the next section
    cTags.value?.scrollTo({
      left: currentScrollLeft! + cTags.value!.clientWidth,
      behavior: "smooth",
    });
  }
}

// emit an event when a tag is clicked: focus-category event is emitted with the categoryId

//use an event bus to communicate between the components
// function focusCategory(categoryId: string) {
//   // console.log("click: ",categoryId);
//   focusedCategory.value = categoryId;
//   eventBus.emit("focus-category", "category-" + categoryId);
// }

//using store pinia
function focusCategory(category) {
  activeCategory.value = category.id;
  // console.log( activeCategory.value);
  activeCategoryStore.setActiveCategoryId(category.id);
  forcusCategoryStore.setFocusedCategoryId(category.id);
}
watch(
  () => activeCategoryStore.getActiveCategoryId,
  (activeCategoryId) => {
    activeCategory.value = activeCategoryId;
  }
);
</script>

<style scoped lang="scss">
@import "./navbarMenu.scss";
</style>
