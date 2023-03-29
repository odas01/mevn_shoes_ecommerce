<script>
import { Carousel } from "bootstrap";
import banner1 from "@/assets/image/banner/banner1.jpg";
import banner2 from "@/assets/image/banner/banner2.jpg";
import banner3 from "@/assets/image/banner/banner3.jpg";
import banner4 from "@/assets/image/banner/banner4.jpg";
export default {
  data() {
    return {
      banners: [banner1, banner2, banner3, banner4],
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
        :key="index"
      >
        <img
          class="d-block w-100"
          v-bind="index"
          :src="banner"
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
