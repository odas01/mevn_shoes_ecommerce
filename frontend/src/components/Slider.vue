<script>
import { Carousel } from "bootstrap";
export default {
  data() {
    return {
      banners: ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg"],
    };
  },
  mounted() {
    new Carousel(this.$refs.carousel);
  },
};
</script>

<template>
  <div
    id="carouselExampleControls"
    class="carousel slide"
    data-bs-ride="carousel"
    ref="carousel"
  >
    <div class="carousel-inner">
      <div
        class="carousel-item"
        v-for="(banner, index) in banners"
        :class="{ active: index === 0 }"
      >
        <img
          class="d-block w-100"
          v-bind="index"
          :src="`src/assets/image/banner/${banner}`"
          :alt="`Slide ${index + 1}`"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style lang="scss">
@use "../scss/" as *;

.carousel {
  border-radius: 2px;
  overflow: hidden;
  & img {
    height: 530px;

    @include mobile {
      height: 160px;
    }
  }
}
</style>
