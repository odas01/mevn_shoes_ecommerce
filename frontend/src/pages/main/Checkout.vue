<script>
import { Row, Col } from "ant-design-vue";
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import Total from "@/components/Total.vue";
export default {
    components: {
        Row,
        Col,
        Total,
    },
    data() {
        return {
            carts: [],
            infoOrder: { ship: "Normal" },
        };
    },
    computed: {
        total() {
            let total = this.carts.reduce((cur, item) => {
                return cur + item.qty * item.product.price;
            }, 0);
            if (this.infoOrder.ship) {
                switch (this.infoOrder.ship) {
                    case "Express":
                        this.infoOrder.shipCost = 30000;
                        total += 30000;
                        break;
                    case "Economical":
                        this.infoOrder.shipCost = 15000;
                        total += 15000;
                        break;
                    default:
                        this.infoOrder.shipCost = 0;
                        total += 0;
                }
            }
            if (
                this.infoOrder.discount &&
                this.infoOrder.discount.includes("abc")
            )
                total -= 70000;
            return total;
        },
        totalAmount() {
            return this.carts.reduce((cur, item) => {
                return cur + item.qty * item.product.price;
            }, 0);
        },
        cartCount() {
            return this.carts.length;
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
                    item.product.image =
                        "data:image/png;base64," + item.product.image;
                });
            } catch (e) {
                console.log(e);
            }
        },
        async addOrder() {
            const valid = this.checkData();
            if (valid) {
                const data = this.createOrderData(this.carts);
                try {
                    await OrderService.create(this.$store.state.user.id, data);
                    await CartService.deleteOne(this.cartId);
                } catch (error) {
                    console.log(error);
                }
                await this.$swal({
                    position: "top",
                    text: "Thanks for shopping at NikeShose 😘",
                    imageUrl: "/src/assets/image/checkout/thanks.jpg",
                    imageWidth: 400,
                    imageHeight: 200,
                    showConfirmButton: false,
                    timer: 3000,
                });
                location.replace("/");
            }
        },
        checkData() {
            const phone = this.$refs.phone;
            const address = this.$refs.address;

            if (!this.infoOrder.phone) {
                phone.focus();
                phone.classList.add("error");
            }
            if (!this.infoOrder.address) {
                address.focus();
                address.classList.add("error");
            }
            return !!this.infoOrder.phone && !!this.infoOrder.address;
        },
        createOrderData(data) {
            const details = data.map((item) => ({
                productId: item.product._id,
                size: item.size,
                qty: item.qty,
                newStock: item.product.stock - item.qty,
            }));
            return {
                ...this.infoOrder,
                phone: "0" + this.infoOrder.phone,
                details,
                userId: this.$store.state.user.id,
                discount: !!this.infoOrder.discount?.includes("abc")
                    ? 70000
                    : 0,
                qty: details.length,
                total: this.total,
            };
        },
    },
    mounted() {
        this.getCart();
    },          
    created(){
        document.title = "Checkout"
    }
};
</script>
<template>
    <h3 class="checkout__title">Payment</h3>
    <div class="checkout__address">
        <h5>
            <i class="fa-solid fa-location-dot"></i>
            Delivery address
        </h5>
        <div class="checkout__address-wrap">  
            <div>
                <input type="number" placeholder="Enter your phone" required v-model="infoOrder.phone" ref="phone">
                <span></span>
            </div>
            <div>
                <input type="text" placeholder="Enter delivery address" required  v-model="infoOrder.address" ref="address">
                <span></span>
            </div>
        </div>
    </div>
    <div class="checkout">
                <div class="checkout__body">
                    <div class="checkout__top">
                        <Row :gutter='16'>
                            <Col :span='12'>
                                <span>Product</span>
                            </Col>
                            <Col :span='5'>
                                <span>Unit</span>
                            </Col>
                            <Col :span='2'>
                                <span>Quantity</span>
                            </Col>
                            <Col :span='5'>
                                <span>Total</span>
                            </Col>
                        </Row>
                    </div>
                    <ul class="checkout__list">
                    <li class="checkout__item" v-for="item in carts">
                        <Row :gutter='16' :wrap="true">
                            <Col :xl='12' :xs="24">
                                <div class="checkout__wrap">
                                    <div class="checkout__info">
                                        <img class="checkout__info-thumbnail" :src="item.product.image" alt="" />
                                        <span class="checkout__info-name">{{ item.product.name }}</span>
                                        <span class="checkout__info-size">Size: {{ item.size }}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col :xl='4' :xs="8">
                                <span>{{ (item.product.price).toLocaleString("de-DE") }}đ</span>
                            </Col>
                            <Col :xl='4' :xs="8">
                                <span>{{item.qty}}</span>
                            </Col>
                            <Col :xl='4' :xs="8">
                                <span>{{ (item.product.price * item.qty).toLocaleString("de-DE") }}đ</span>
                            </Col>
                        </Row>
                    </li> 
                    </ul>
                </div>
    </div>    
    <div class="checkout__bottom"> 
        <Total v-model="infoOrder" :length='cartCount' :total='total' :totalAmount='totalAmount' @addOrder='addOrder' />
    </div>
      
</template>

<style lang="scss" scoped>
@use "../../scss/" as *;
.checkout {
    min-height: 100%;
    padding: 12px 24px;
    border-radius: 4px;
    background-color: #f6f6f6;

    &__title {
        text-transform: capitalize;
        font-size: 28px;
        margin-bottom: 0;
        padding-bottom: 20px;
    }

    &__address {
        padding: 12px 24px;
        background-color: #f6f6f6;
        margin-bottom: 24px;

        h5 {
            @include flex(center);
            font-size: 18px;
            color: #ee4d2d;
            i {
                margin-right: 8px;
                font-size: 16px;
            }
        }

        &-wrap {
            @include flex(center);

            div:first-child {
                width: 200px;
                
                @include mobile{
                    width: 100%;
                }
            }

            div:last-child {
                flex: 1;
                margin-left: 24px;

                @include mobile{
                    margin-left: 0;
                }
            }

            @include mobile{
                flex-direction:column;

                div{
                    width: 100%;
                    margin-top: 12px;
                }
            }
        }

        input {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.4);
            height: 100%;
            padding: 8px 12px;
            position: relative;

            & + span {
                position: relative;
            }

            & + span::before {
                position: absolute;
                transform: translate(-25px, 6px);
            }

            &:valid {
                border-color: #0e9f6e !important;
            }

            &:invalid + span::before {
                content: "✖";
                color: #d43f21;
            }

            &:valid + span::before {
                content: "✓";
                color: #0e9f6e;
            }
            &.error {
                border-color: #d43f21;
            }
        }
    }

    &__top {
        padding: 20px 0 8px;
        span {
            font-size: 20px;
            font-style: italic;
        }

        & .ant-col:not(:first-child) {
            text-align: center;
        }

        @include mobile{
            display: none;
        }
    }

    &__item {
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
        user-select: none;

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

        @include mobile{
            padding-bottom: 12px;

            &-size{
                bottom: 10px;
            }
        }
    }

    &__bottom {
        margin-top: 24px;
        padding: 12px 24px;
        background-color: #f6f6f6;
    }
}
</style>