<template>
  <div class="item-container">
    <div class="item-wrapper" @click="addItemToStore">
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
import PlusIcon from "./icons/plus.svg";
import { useBasketStore } from "../../../stores/basketStore";
import { Item } from "../../../models/Item";

const props = defineProps({
  item: {
      type: Object as () => Item, // Specify the type of the 'item' prop
      required: true, // Optional, use if 'item' is a required prop
    },
});

//save selected items in store using store pinia
const basketStore = useBasketStore();
const addItemToStore = () => {
  if (props.item) {
    const item = props.item;
    basketStore.addItem(item);
  }
};
</script>

<style scoped lang="scss">
@import "./itemCard.scss";
</style>
