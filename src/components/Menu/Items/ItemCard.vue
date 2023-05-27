<template>
  <div class="item-container">
    <div class="item-wrapper">
      <!--<div class="item-image">
       <img :src="item.image" alt="" /> 
    </div>-->

      <div class="item-details">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-description">{{ item.description }}</div>
        <div class="item-price">{{ item.price }} €</div>
      </div>
      <div class="add-icon"><PlusIcon/></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import PlusIcon from "./icons/plus.svg?component";

const props = defineProps({
  item: Object,
});
</script>

<style scoped lang="scss">
@import "./itemCard.scss";
</style>
