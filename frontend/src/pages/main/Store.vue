<script>
import Card from "@/components/Card.vue";
import Pagination from "@/components/Pagination.vue";
import FilterStore from "@/components/FilterStore.vue";
import FilterStoreMobile from "@/components/FilterStoreMobile.vue";

import ProductService from "@/services/product.service";
import CategorytService from "@/services/category.service";

import { Row, Col } from "ant-design-vue";

export default {
  components: {
    FilterStore,
    FilterStoreMobile,
    Card,
    Pagination,
    Row,
    Col,
  },
  data() {
    return {
      orderby: "default",
      products: [],
      page: 1,
      last_page: 1,
      quantity: 1,
      componentKey: 0,
      filter: {},
      sort: "default",
      isScroll: false,
      visible: false,
    };
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
    category() {
      return this.$route.params.category !== "all"
        ? this.$route.params.category
        : "";
    },
  },
  watch: {
    $route(to) {
      this.changeParams();
      this.setTitlePage(to.params.type, to.params.category);
    },
  },
  async created(to) {
    await this.changeParams();
    this.setTitlePage(this.$route.params.type, this.$route.params.category);
  },
  methods: {
    async changeParams() {
      this.componentKey++;

      this.page = this.$route.query.page || 1;
      const filter = {
        ...this.$route.params,
        page: +this.$route.query.page || 1,
        sort: this.sort,
      };
      this.$store.commit("SET_FILTER", filter);
      await this.getProducts();
    },
    async getProducts() {
      try {
        const result = await ProductService.filter({
          ...this.$store.state.filter,
          limit: 6,
        });

        this.products = await result.data;
        this.last_page = await result.last_page;
        this.quantity = await result.quantity;
      } catch (error) {
        console.log(error);
      }
    },
    filterPrice(price) {
      this.$store.commit("SET_FILTER", {
        ...this.$store.state.filter,
        price,
      });
      this.getProducts();
    },
    setOrder(e) {
      if (e.target?.type === "radio") this.sort = e.target.id;
      else {
        this.sort = e.target.value;
        this.$refs.orderby.innerHTML = e.target.innerHTML;
        this.isScroll = !this.isScroll;
      }

      this.$store.commit("SET_FILTER", {
        ...this.$store.state.filter,
        sort: this.sort,
      });
      this.getProducts();
    },
    scrollOrder() {
      this.isScroll = !this.isScroll;
    },
    setTitlePage(type, category) {
      let title = "";
      if (category === "all") {
        title = type + " shose";
      } else {
        title = type + ` ${category}` + " shose";
      }
      const words = title.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      document.title = words.join(" ");
    },
    showDrawer() {
      this.visible = true;
    },
    closeDrawer() {
      this.visible = false;
    },
  },
  // async beforeRouteEnter(to, from, next) {
  //   const result = await CategorytService.getAll();
  //   const bool =
  //     ["men", "kid", "women"].some((item) => item === to.params.type) &&
  //     (result.some((item) => to.params.category === item.name) ||
  //       to.params.category === "all");
  //   bool
  //     ? next()
  //     : next({
  //         name: "notfound",
  //         params: {
  //           pathMatch: to.path.split("/").slice(1),
  //         },
  //         query: to.query,
  //         hash: to.hash,
  //       });
  // },
};
</script>

<template>
  <div class="store">
    <div class="store__header d-flex justify-content-between">
      <div class="store__title">
        {{ type }}'s {{ category }} shose ({{ quantity }})
      </div>

      <div class="store__orderby">
        <div class="store__orderby-title" @click="scrollOrder">
          Sort By:
          <span ref="orderby">Default</span>
          <i v-if="isScroll" class="fa-sharp fa-solid fa-chevron-up"></i>
          <i v-else class="fa-sharp fa-solid fa-chevron-down"></i>
        </div>
        <div
          class="store__orderby-dropdown"
          ref="orderDropdown"
          :style="{ height: !isScroll ? '0' : '164px' }"
        >
          <button value="default" @click="setOrder">Default</button>
          <button value="name" @click="setOrder">Name: A-Z</button>
          <button value="name:desc" @click="setOrder">Name: Z-A</button>
          <button value="price" @click="setOrder">Price: Low-High</button>
          <button value="price:desc" @click="setOrder">Price: High-Low</button>
        </div>
      </div>

      <div class="store__filter-mobile">
        <div @click="showDrawer">Filter <i class="fa-solid fa-bars"></i></div>
        <FilterStoreMobile
          :key="componentKey"
          :visible="visible"
          @setOrder="setOrder"
          @filterPrice="filterPrice"
          @closeDrawer="closeDrawer"
        />
      </div>
    </div>
    <Row :gutter="16">
      <Col :xl="6" :xs="0">
        <FilterStore @filterPrice="filterPrice" :key="componentKey" />
      </Col>
      <Col :xl="18" :xs="24">
        <Row
          :gutter="[
            { xl: 16, xs: 8 },
            { xl: 16, xs: 8 },
          ]"
        >
          <Col :xl="8" :xs="12" v-for="data in products">
            <Card :data="data" />
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
  <Pagination :page="+page" :last_page="+last_page" />
</template>

<style lang="scss">
@use "../../scss" as *;
.store {
  &__header {
    height: 40px;

    @include mobile {
      padding: 28px 20px 12px;
      height: unset;
    }
  }

  &__title {
    text-transform: capitalize;
    font-size: 28px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);

    @include mobile {
      font-size: 20px;
    }
  }

  &__orderby {
    width: 240px;
    height: fit-content;
    background-color: transparent !important;
    position: relative;
    z-index: 2;

    @include mobile {
      display: none;
    }

    &-title {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      cursor: pointer;

      span {
        opacity: 0.7;
        margin-left: 12px;
      }
      i {
        opacity: 0.7;
        margin-left: 4px;
      }
    }

    &-dropdown {
      padding: 0 12px;
      position: absolute;
      top: calc(100% + 2px);
      right: 0;
      overflow: hidden;
      background-color: #fff;
      transition: height 0.3s ease;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

      button {
        display: block;
        padding: 4px 8px;
        background-color: transparent;
      }
    }
  }

  &__filter-mobile {
    display: none;
    div {
      font-size: 12px;
      padding: 4px 12px;
      border: 1px solid #ccc;
      border-radius: 100rem;
    }
  }
}
</style>
