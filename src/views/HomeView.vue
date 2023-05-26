<template>
  <div class="wrapper">
    <NavbarMenu />
    
    <Footer/>
  </div>
</template>
<script setup lang="ts">
import Footer from "../components/Footer/Footer.vue";
import NavbarMenu from "../components/NavbarMenu/NavbarMenu.vue";
</script>
<style scoped lang="scss">
.wrapper{
  width: 100%;
  height: 100%;
  display: flexbox;
}</style>
