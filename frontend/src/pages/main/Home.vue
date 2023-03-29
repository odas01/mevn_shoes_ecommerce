<script>
import Slider from "@/components/Slider.vue";
import Card from "@/components/Card.vue";
import { Row, Col } from "ant-design-vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import ProductService from "@/services/product.service";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Slider,
    Card,
    Swiper,
    SwiperSlide,
    Row,
    Col,
  },
  data() {
    const topSellers = {
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      },
    };
    return {
      topSellers,
      modules: [Pagination],
      products: [
        {
          title: ["men", "women"],
          banner: "banner7.jpg",
          data: [],
        },
        {
          title: ["kid"],
          banner: "banner8.jpg",
          data: [],
        },
      ],
    };
  },
  methods: {
    async getProducts() {
      try {
        const productMen = (
          await ProductService.filter({ type: "men", limit: 4 })
        ).data;
        const productWomen = (
          await ProductService.filter({ type: "women", limit: 4 })
        ).data;

        this.products[1].data = (
          await ProductService.filter({
            type: "kid",
            limit: 8,
          })
        ).data;
        this.products[0].data = [...productMen, ...productWomen];
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
  created() {
    document.title = "Home";
  },
};
</script>

<template>
  <Slider />
  <div class="topSellers">
    <h3 class="topSellers__title">TOP SELLERS</h3>
    <div class="gx-3" style="background-color: #f6f6f6">
      <swiper
        :slidesPerView="1"
        :spaceBetween="10"
        :pagination="{ clickable: true }"
        :breakpoints="topSellers.breakpoints"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="item in products[0].data">
          <Card :data="item" />
        </swiper-slide>
      </swiper>
    </div>
  </div>

  <div class="banner">
    <div class="row">
      <div class="col col-md-12">
        <img src="../../assets/image/banner/banner5.jpg" alt="" />
      </div>
    </div>
  </div>

  <div class="list__card mt-4" v-for="product in products">
    <div class="list__card-title mb-3">
      <router-link
        v-for="title in product.title"
        :to="{
          name: 'category.show',
          params: { type: title, category: 'all' },
        }"
      >
        Shop {{ title }}'s
      </router-link>
    </div>
    <img :src="'src/assets/image/banner/' + product.banner" alt="" />
    <Row
      :gutter="[
        { xs: 8, xl: 16 },
        { xs: 8, xl: 16 },
      ]"
    >
      <Col :xl="6" :xs="12" v-for="dataItem in product.data"
        ><Card :data="dataItem"
      /></Col>
    </Row>
  </div>
</template>

<style lang="scss" scoped>
@use "../../scss/" as *;

.topSellers {
  position: relative;
  border-top: 1px solid #d9d9d9;
  margin-top: 32px;

  &__title {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $white-color;
    padding: 0 20px;
    font-size: 24px;
    font-style: italic;
  }

  & > div {
    margin-top: 36px;
  }

  @include mobile {
    display: none;
  }
}

.banner {
  margin-top: 24px;

  img {
    border-radius: 2px;
  }

  @include mobile {
    margin-top: 6px;
  }
}

.list__card {
  &-title {
    @include flex(initial, center);
    font-size: 24px;

    & a {
      font-size: 20px;
      font-weight: 600;
      font-style: italic;
    }

    & > * ~ * {
      margin-left: 40px;
    }
  }

  @include mobile {
    a {
      font-size: 16px;
    }
  }
}
</style>
