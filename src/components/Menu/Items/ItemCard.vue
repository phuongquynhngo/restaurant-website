<template>
  <div class="item-container">
    <div class="item-wrapper" @click="handleClick">
      <!--<div class="item-image">
       <img :src="item.image" alt="" /> 
    </div>-->

      <div class="item-details">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-description">{{ item.description }}</div>
        <div class="item-price">{{ item.price }} €</div>
      </div>
      <div class="add-icon"><PlusIcon /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import PlusIcon from "./icons/plus.svg?component";
import { useBasketStore  } from "../../../stores/basketStore";

const emit = defineEmits(["add-item-to-basket"]);

const props = defineProps({
  item: Object,
});
// Emit custom event to add item to the basket
function addToBasket(item) {
  // console.log("quang");
  emit("add-item-to-basket", item);
}


const basketStore = useBasketStore();

const addItemToStore = () => {
  const item = props.item;
  basketStore.addItem(item);
};

const handleClick = (item) => {
  addToBasket(item);
  addItemToStore();
};
</script>

<style scoped lang="scss">
@import "./itemCard.scss";
</style>
