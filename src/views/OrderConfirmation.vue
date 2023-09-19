<template>
    <div class="wrapper">
      <div class="thank-message" >Thank you for your order!</div>
      <router-link class="to-main-btn" to="/">Return to Main Page</router-link>
    </div>
</template>
  
<script setup lang="ts">
</script>
<style scoped lang="scss">
.wrapper {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; 
  padding: 0 2rem;
  .thank-message{
    padding: 4rem;
    font-size: 2rem;
  }
  .to-main-btn {
    padding:  1rem;
    color: #ffffff;
    background-color: #2c6373;
    text-align: center;
    border-radius: 10px;
    user-select: none;
    &:hover {
      background-color: #155264;
    }
  }
}

</style>
