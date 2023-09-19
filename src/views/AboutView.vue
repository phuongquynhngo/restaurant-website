<template>
  <div class="about-wrapper">
    <div class="about">
      <div class="about-header">
        <h1>About Viet Quan Asia Imbiss</h1>
      </div>
      <div class="about-content">
        <p>
          Welcome to Viet Quan Asia Imbiss, where we bring the rich and diverse flavors of Asian cuisine to your plate. Our passion for authentic dishes and
          commitment to quality ingredients sets us apart.
        </p>
        <p>
          Our culinary team crafts each dish with care, ensuring a harmonious blend of taste and presentation. From our signature pho to our tantalizing
          stir-fries, every bite is an experience in itself.
        </p>
        <p>We invite you to join us on a journey through the vibrant culinary traditions of Asia. Discover the artistry of flavors at Viet Quan Asia Imbiss.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.about-wrapper {
  min-height: 100vh;
  
  @media only screen and (min-width: 600px) and (max-width: 1280px) {
    padding-bottom: 2rem;
  }
  
  @media only screen and (max-width: 600px) {
    padding-bottom: 10rem;
  }
}

.about {
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  @media only screen and (max-width: 860px) {
    margin: 2rem;
  }
}

.about-header h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.about-content {
 
}
.about-content p {
  font-size: 1.3rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}
</style>
