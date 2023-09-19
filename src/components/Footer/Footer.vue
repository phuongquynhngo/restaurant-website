<template>
  <div :class="wrapperClasses">
    <div class="footer-content">
      <div class="section-links">
        <router-link to="/">Menu</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div :class="contactInfoClasses">
        <p>123 Restaurant Street, Cityville</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: info@asia-imbiss.mail</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from "vue";
import { useIsSmallScreenStore } from "../../stores/isSmallScreenStore";
let isSmallScreenStore = useIsSmallScreenStore();
import { useRouter } from "vue-router";
const router = useRouter();
const thisCurrentRoute = ref<string | null>(null);


// get the name of current route
onMounted(() => {
  watch(
    () => router.currentRoute.value.name,
    (route) => {
      if ( typeof route === 'string') {
        thisCurrentRoute.value = route;
      }
    }
  );
});


const wrapperClasses = computed(() => {
  const currentRoute =  thisCurrentRoute.value ;
  //check to ensure that currentRoute is neither undefined nor null  
  if (currentRoute !== undefined && currentRoute !== null) {
    return {
      "footer-wrapper": true,
      "small-screen": isSmallScreenStore.smallScreen && currentRoute === "Home",
    };
  }
});

const contactInfoClasses = {
  "contact-info": true, // Always apply this class
  //   "contact-info-special-route":  router.currentRoute.value.name === "Checkout", // Apply this class on the specific route named 'specialRoute'
};


</script>

<style scoped lang="scss">
@import "./footer";
</style>
