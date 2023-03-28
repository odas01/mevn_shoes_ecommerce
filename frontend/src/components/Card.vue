<script>
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    SearchOutlined,
    ShoppingCartOutlined,
  },
  mounted() {
    console.log(this.data);
  },
};
</script>

<template>
  <router-link :to="{ name: 'detail', params: { id: data._id } }" class="card">
    <img
      :src="'data:image/png;base64,' + data.image"
      alt=""
      class="card-img-top"
    />
    <div class="card-body">
      <span class="card__name">{{ data.name }}</span>
      <span class="card__price"
        >{{ new Intl.NumberFormat("de-DE").format(data.price) }}đ</span
      >
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use "../scss/" as *;

.card {
  height: 100%;
  border-color: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  color: unset;
  background-color: #f6f6f6;

  &-img-top {
    flex: 1;
  }

  &-body {
    @include flex();
    flex-direction: column;
    position: relative;
    height: 105px;

    @include mobile {
      height: 95px;
    }
  }

  &__name {
    font-size: 14px;
    color: $black-color;
    line-height: 18px;
    padding-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.35s ease;
  }

  &__price {
    color: #e70303;
    font-weight: 600;
    font-size: 16px;
    margin-right: 10px;
    margin-top: auto;
    transition: all 0.35s ease;

    @include mobile {
      font-size: 14px;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(72, 76, 97, 0) 0%,
      rgb(119 164 152 / 80%) 75%
    );
    content: "";
    opacity: 0.5;
    transform: translateY(100%);
    transition: opacity 0.35s, transform 0.35s;
  }

  &:hover::before {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover &__icon {
    opacity: 1;
    transform: translateX(-50%);
  }
}
</style>
