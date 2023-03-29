<script>
import CartService from "@/services/cart.service";
import { Modal, Row, Col } from "ant-design-vue";

export default {
  components: {
    Modal,
    Row,
    Col,
  },
  data() {
    return {
      carts: [],
      visible: false,
      idActive: -1,
    };
  },
  computed: {
    cartCount() {
      return this.carts.length;
    },
    nameAcitve() {
      if (this.idActive === -1) return "";
      return this.carts.find((item) => item._id === this.idActive).product.name;
    },
    total() {
      return this.carts.reduce((cur, item) => {
        return cur + item.qty * item.product.price;
      }, 0);
    },
    cartId() {
      return localStorage.getItem("cartId");
    },
  },
  methods: {
    async getCart() {
      try {
        this.carts = (await CartService.get(this.cartId)).details;
        this.carts.forEach((item) => {
          item.product = item.productId;
          delete item.productId;
          item.product.image = "data:image/png;base64," + item.product.image;
        });
      } catch (e) {
        console.log(e);
      }
    },
    async toCheckout() {
      try {
        const cartId = this.$store.state.user.cartId;
        const carts = this.carts.map((cart) => ({
          _id: cart._id,
          qty: cart.qty,
        }));
        await CartService.update(cartId, carts);
      } catch (e) {
        console.log(e);
      }
      this.$router.push({ name: "checkout" });
    },
    async deleteCart() {
      try {
        await CartService.deleteOne(this.cartId, this.idActive);
      } catch (e) {
        console.log(e);
      }
      this.closeModal();
      this.$store.commit("REDUCE_QUANTITY");
      this.refreshList();
    },
    refreshList() {
      if (this.cartId) {
        this.getCart();
      }
      this.idActive = -1;
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    setIdActive(id) {
      this.idActive = id;
      this.showModal();
    },
  },
  mounted() {
    this.refreshList();
  },
  created() {
    document.title = "Cart";
  },
};
</script>
<template>
  <div class="cart">
    <div class="cart__wrap">
      <h3 class="cart__title">Shopping Cart</h3>
      <div v-if="cartCount" class="cart__top">
        <Row :gutter="16">
          <Col :span="12">
            <span>Product</span>
          </Col>
          <Col :span="4">
            <span>Unit</span>
          </Col>
          <Col :span="4">
            <span>Quantity</span>
          </Col>
          <Col :span="4">
            <span>Total</span>
          </Col>
        </Row>
      </div>
      <ul v-if="cartCount" class="cart__list">
        <li v-for="(item, index) in carts" class="cart__item" :key="index">
          <Row :gutter="16" :wrap="true">
            <Col :xl="12" :xs="24">
              <router-link
                :to="{ name: 'detail', params: { id: item.product._id } }"
                class="cart__info"
              >
                <img
                  class="cart__info-thumbnail"
                  :src="item.product.image"
                  alt=""
                />
                <span class="cart__info-name">{{ item.product.name }}</span>
                <span class="cart__info-size">Size: {{ item.size }}</span>
              </router-link>
            </Col>
            <Col :xl="4" :xs="8">
              <span class="cart__price"
                >{{ item.product.price.toLocaleString("de-DE") }}đ</span
              >
            </Col>
            <Col :xl="4" :xs="8">
              <div class="cart__quantity">
                <button class="btn-down" @click="item.qty > 1 && item.qty--">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input
                  class="quanlity"
                  type="number"
                  min="1"
                  name="quantity[2]"
                  v-model="item.qty"
                />
                <button
                  class="btn-up"
                  @click="item.qty < item.product.stock && item.qty++"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </Col>
            <Col :xl="4" :xs="8">
              <span class="cart__price"
                >{{
                  (item.product.price * item.qty).toLocaleString("de-DE")
                }}đ</span
              >
            </Col>
            <span class="cart__delete" @click="setIdActive(item._id)">
              <i class="fa-solid fa-trash-can"></i>
            </span>
          </Row>
        </li>

        <Modal
          title="Warning"
          :visible="visible"
          @ok="deleteCart"
          @cancel="closeModal"
          :destroyOnClose="true"
        >
          Do you want to remove
          <span style="font-weight: 700">{{ nameAcitve }}</span> from your cart?
        </Modal>
      </ul>
      <div v-else class="cart__noCart">
        <img src="../../assets/image/cart/noCart.png" alt="" />
        <h4>You have no items in your shopping cart!!</h4>
      </div>
    </div>

    <div class="cart__bottom">
      <div class="cart__total">
        Total({{ cartCount }} item):
        <span>{{ total.toLocaleString("de-DE") }}đ</span>
      </div>
      <button
        class="cart__buy"
        :class="{ disabled: !cartCount }"
        :disabled="!cartCount"
        @click="toCheckout"
      >
        Check out
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../scss/" as *;
.cart {
  &__title {
    text-transform: capitalize;
    font-size: 28px;
    margin-bottom: 0;
    padding-bottom: 20px;
    border-bottom: 2px solid #2496ed;

    @include mobile {
      font-size: 24px;
      padding-bottom: 12px;
    }
  }

  &__wrap {
    min-height: 100%;
    padding: 12px 24px;
    border-radius: 4px;
    background-color: #f6f6f6;

    @include mobile {
      padding: 28px 20px 0;
    }
  }
  &__top {
    padding: 20px 0 8px;
    span {
      font-size: 20px;
      font-weight: 500;
      font-style: italic;
    }

    & .ant-col:not(:first-child) {
      text-align: center;
    }

    @include mobile {
      display: none;
    }
  }

  &__item {
    position: relative;
    padding: 24px 0;

    & .ant-col:not(:first-child) {
      @include flex(center, center);
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  &__info {
    @include flex(center);
    position: relative;

    &-thumbnail {
      width: 100px;
      height: 100px;
    }

    &-name {
      width: 100%;
      margin-left: 28px;
    }

    &-size {
      position: absolute;
      left: 110px;
      bottom: 0;
      font-style: italic;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.7);
    }

    @include mobile {
      padding-bottom: 12px;

      &-size {
        bottom: 10px;
      }
    }
  }

  &__quantity {
    @include flex(center);
    height: 40px;

    &-mobile {
      display: none;
    }

    @include mobile {
      display: flex;
    }

    input {
      display: block;
      width: 30px;
      margin: 0 5px;
      text-align: center;
      background-color: #f6f6f6;
    }

    button {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      border: 3px solid #2496ed;
    }
  }

  &__price {
    font-weight: 600;
  }

  &__delete {
    position: absolute;
    right: 26px;
    bottom: 16px;
    width: 20px;
    cursor: pointer;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;

    &:hover {
      animation: jelly 0.5s;
    }

    @include mobile {
      right: 10px;
      bottom: 6px;
    }
  }

  &__bottom {
    @include flex(center, flex-end);
    padding: 12px;
    margin-top: 12px;
  }

  &__buy {
    width: 208px;
    height: 46px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    background-color: #0e9f6e;
    transition: all 0.2s ease;

    &:hover {
      background-color: #057a55;
    }

    &.disabled {
      opacity: 0.4;
      cursor: initial;
    }
  }

  &__total {
    font-size: 18px;
    margin-right: 16px;

    span {
      font-weight: 600;
      color: #e84118;
    }
  }

  &__noCart {
    text-align: center;
    padding-top: 12px;

    h4 {
      opacity: 0.7;
      margin-top: 12px;
    }
  }
}
</style>
