<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
<div class="container">
    <RouterView />
    
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  background-image: url('./assets/photos/background.jpg');
  background-size: cover; /* Adjust the size as needed */
  background-position: center; /* Adjust the position as needed */
  background-repeat: repeat;
  /* Additional background properties */
  /* background-repeat: no-repeat; */
  /* background-attachment: fixed; */
  // padding: 1rem;
  box-sizing: border-box; //set the box-sizing property to border-box to include padding and borders
}

</style>
