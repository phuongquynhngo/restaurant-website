<template>
  <div class="item-container">
    <div class="item-wrapper" @click="addItemToStore">
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
import { defineProps } from "vue";
import PlusIcon from "./icons/plus.svg?component";
import { useBasketStore } from "../../../stores/basketStore";

const props = defineProps({
  item: Object,
});

//save selected items in store using store pinia
const basketStore = useBasketStore();
const addItemToStore = () => {
  const item = props.item;
  basketStore.addItem(item);
};
</script>

<style scoped lang="scss">
@import "./itemCard.scss";
</style>
