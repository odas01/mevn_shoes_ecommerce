<script>
import Card from "@/components/Card.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import { Row, Col } from "ant-design-vue";
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";

// Import Swiper styles
import "swiper/css";
export default {
    components: {
        Card,
        Swiper,
        SwiperSlide,
        Row,
        Col,
    },
    data() {
        return {
            detail: {},
            quantity: 1,
            isChecked: false,
            modules: [Pagination],
        };
    },
    computed: {
        cartId() {
            return localStorage.getItem("cartId");
        },
    },
    created() {
        this.getDetail();
    },
    methods: {
        setSize(e) {
            this.isChecked = true;
            this.$refs.size.classList.toggle("checked", !this.isChecked);
            this.size = e.target.value;
        },
        async addToCart(detail) {
            this.$refs.size.classList.toggle("checked", !this.isChecked);
            if (!this.cartId) {
                localStorage.setItem(
                    "redirect_login",
                    JSON.stringify({
                        name: this.$route.name,
                        params: this.$route.params,
                        query: this.$route.query,
                    })
                );
                this.$router.push({
                    name: "auth.login",
                });
            } else if (this.isChecked) {
                try {
                    const data = {
                        productId: detail._id,
                        size: +this.size,
                        qty: this.quantity,
                        price: detail.price,
                    };
                    await CartService.create(this.cartId, data);
                    this.$store.dispatch("cartQuantity");

                    await this.$swal({
                        position: "top",
                        icon: "success",
                        text: "Add to cart successfully.",
                        showConfirmButton: false,
                        timer: 1000,
                        width: 350,
                    });
                    this.$router.push({ name: "cart" });
                } catch (error) {
                    console.log(error);
                }
            } else this.$refs.size.classList.toggle("checked", !this.isChecked);
        },
        async getDetail() {
            try {
                this.detail = await ProductService.get(this.$route.params.id);
                this.detail.image =
                    "data:image/png;base64," + this.detail.image;
                this.detail.otherImages = this.detail.otherImages
                    .map((item) => "data:image/png;base64," + item.data)
                    .reverse();
                document.title = this.detail.name
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<template>
    <div class="detail">
        <Row :gutter="{xs: 0, xl: 16}">
            <Col :xl='16' :xs="0">
                <Row :gutter='[12,12]'>
                    <Col :xl='12'>
                        <div class="detail__image">
                            <img :src="detail.image" alt="">
                        </div>
                    </Col>
                    <Col :xl='12' v-for="image in detail.otherImages">
                        <div class="detail__image">
                            <img :src="image" alt="">
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col :xl='8' :xs="24">
                <div class="detail__wrap">
                    <div class="detail__top">
                        <h1 class="detail__name">{{detail.name}}</h1>
                        <span class="detail__status" v-if="detail.stock<=0">Sold out</span>
                        <div class="detail__info">
                            <div class="detail__brand">
                                <span>Brand: </span>
                                <a href="">Nike</a>
                            </div>
                            <div class="line">|</div>
                            <div class="detail__type">
                                <span>Type: </span>
                                <router-link
                                    :to='{name: "category.show", params:{type: detail.type || "men", category:  "all" }}'>
                                    {{detail.type}}
                                </router-link>
                            </div>
                            <div class="line">|</div>
                            <div class="detail__category">
                                <span>Category: </span>
                                <router-link
                                    :to='{name: "category.show", params:{type: detail.type || "men", category: detail.category|| "running" }}'>
                                    {{detail.category}}
                                </router-link>
                            </div>
                        </div>
                        <span class="detail__price">{{Number(detail.price).toLocaleString('de-DE')}}đ</span>
                    </div>
                    <div class="detail__image-mobile">
                        <swiper
                            :slidesPerView="1"
                            :spaceBetween="10"
                            :pagination="{ clickable: true }"
                            :modules="modules"
                            class="mySwiper"
                        >
                            <swiper-slide>
                                <img :src="detail.image" alt="img">
                            </swiper-slide>
                        
                            <swiper-slide v-for="image in detail.otherImages">
                                <img :src="image" alt="img#">
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="detail__bottom">
                        <p>{{detail.description}}</p>
                        <div class="detail__size" ref="size">
                            <span class="detail__size-title">
                                Select size
                            </span>
                            <div class="detail__size-wrap">
                                <Row :gutter='[8,8]' >
                                    <Col :span='6'  v-for="sizeItem in detail.size">
                                        <div class="detail__size-option">
                                            <input :id='`size${sizeItem}`' type="radio" name="size" :value="sizeItem" @click='setSize'  :disabled='detail.stock<=0'>
                                            <label :for='`size${sizeItem}`' >
                                                <span>{{sizeItem}}</span>
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <span class="detail__size-error" ref="error">Please select a size.</span>
                        </div>
                        <div class="detail__quantity">
                            <label class="detail__quantity-title" for="quantity">Quantity</label>
                            <div class="detail__quantity-btn">
                                <button type="button" id="btn-minus" @click='quantity> 1 && quantity--'>-</button>
                                <input type="text" min="1" id="quantity" v-model="quantity" disabled>
                                <button type="button" id="btn-plus" @click='quantity<detail.stock && quantity++'>+</button>
                            </div>
                        </div>
                        <div class="detail__add-btn">
                            <button type="button" name="add" @click='addToCart(detail)' :disabled='detail.stock<=0'>
                            ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <div class="row justify-content-end">
            <div class="col col-md-7">
                <div class="detail__contact">
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-google"></i>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-solid fa-envelope"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss'>
@use "../../scss/" as *;
.detail {
    $height: 510px;

    img{
        border-radius: 2px;
    }

    &__image {
        border-radius: 6px;
        overflow: hidden;

        &-mobile{
            display: none;
            
            @include mobile{
                display: block;
            }
        }
    }

    &__wrap {
        display: flex;
        flex-direction: column;
        padding: 40px 20px 0;
        height: $height;

        @include mobile{
            height: unset;
            padding: 28px 0 0;
        }

        & > * ~ * {
            margin-top: 12px;

            @include mobile{
                margin-top: 4px;
            }
        }
    }

    &__top{
        padding: 0 20px 12px;
    }

    &__bottom{
        padding: 12px 20px 0;
    }

    &__name {
        font-size: 28px;
        text-transform: capitalize;
        margin: 0;
        position: relative;

        @include mobile{
            font-size: 24px;
        }
    }

    &__status {
        margin-top: 0;
        position: absolute;
        top: 12px;
        padding: 4px 8px;
        background-color: #9b1c1c;
        font-size: 10px;
        color: $white-color;
        border-radius: 6px;
        width: fit-content;
    }

    &__info {
        display: flex;
        font-size: 14px;

        & a {
            font-weight: 500;
            font-size: 15px;
            text-transform: uppercase;
        }

        & > * ~ * {
            margin-left: 8px;
        }
    }

    &__price {
        font-size: 20px;
        color: #ff0000;

        @include mobile{
            margin-top: 12px;
        }
    }

    &__size {
        &-title {
            display: inline-block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        &-option {
            & input {
                display: none;

                &:checked + label {
                    box-shadow: rgb(17 17 17) 0px 0px 0px 1px inset;
                }

                &:not(:checked) {
                    border-color: rgba($color: #000, $alpha: 0.15);
                }
            }

            & label {
                @include flex(center, center);
                font-size: 15px;
                background: #fff;
                height: 48px;
                width: 100%;
                border: 1px solid rgba($color: #000, $alpha: 0.15);
                cursor: pointer;
                border-radius: 4px;
            }

            & + & {
                margin-left: 12px;
            }
        }

        &-error {
            display: none;
            margin-top: 8px;
            color: #d43f21;
        }

        &.checked &-title {
            color: #d43f21;
        }

        &.checked &-wrap {
            border: 1px solid #d43f21;
            border-radius: 4px;
        }

        &.checked &-error {
            display: inline-block;
        }
    }

    &__quantity {
        @include flex(center);
        margin-top: 16px;

        &-btn {
            height: 40px;
            margin-top: 8px;
            margin-left: 20px;
            border-radius: 100rem;
            overflow: hidden;

            & * {
                height: 100%;
            }

            & input {
                width: 50px;
                line-height: 37px;
                text-align: center;
            }

            & button {
                width: 40px;
                outline: none;
                background: transparent;
                transition: background-color ease 0.2s;
                border: 1px solid rgba($color: #000, $alpha: 0.15);
                border-radius: 100rem;

                &:hover {
                    background-color: rgba($color: #000, $alpha: 0.15);
                }
            }
        }
    }

    &__add-btn {
        @include flex(initial, center);
        margin-top: 24px;

        & button {
            width: 80%;
            height: 64px;
            font-weight: 600;
            border-radius: 100rem;
            color: rgba(255, 255, 255);
            background-color: #0e9f6e;
            transition: all 0.2s ease;

            &:not(:disabled):hover {
                background-color: #057a55;
            }

            @include mobile{
                height: 60px;
                width: 70%;
                font-size: 14px;
            }
        }
    }

    &__contact {
        margin-top: 12px;
        padding-left: 20px;

        i {
            opacity: 0.6;
        }

        i + i {
            margin-left: 12px;
        }

        @include mobile{
            margin: 20px 0 12px;
            padding-left: 0;
            text-align: center;
        }
    }

    &__related {
        margin-top: 100px;
        margin-bottom: 40px;
        border-top: 1px solid rgba($color: #000, $alpha: 0.1);
        position: relative;
        padding-top: 40px;

        &-title {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            padding: 0 20px;
            font-size: 30px;
            font-style: italic;
        }
    }
}
</style>