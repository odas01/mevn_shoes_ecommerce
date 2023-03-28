<script>
import ProductService from "@/services/product.service";
import { Row, Col } from "ant-design-vue";
export default {
    components: {
        Row,
        Col,
    },
    data() {
        return {
            product: {},
        };
    },
    mounted() {
        this.refreshList();
    },
    methods: {
        refreshList() {
            this.getProduct();
        },
        async getProduct() {
            const id = this.$route.params.id;
            try {
                this.product = await ProductService.get(id);
                this.product.image =
                    "data:image/png;base64," + this.product.image;
                this.product.otherImages = this.product.otherImages.map(
                    (item) => "data:image/png;base64," + item.data
                );
                this.product.size = this.product.size.join(" ");
                console.log(this.product);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
    
<template>
    <div class="product">
        <h4 class="product__title">
            Product details
        </h4>
        <div class="product__bpdy">
            <Row>
                <Col :span='11'>
                    <Row :gutter='[8,8]'>
                        <Col :span='12'>
                            <div class="product__thumbnail">
                                <img :src="product.image" alt="">
                            </div>
                        </Col>
                        <Col :span='12' v-for="image in product.otherImages">
                            <div class="product__thumbnail">
                                <img :src="image" alt="">
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col :span='13'>
                    <div class="product__detail">
                        <div class="product__detail-status">
                            Status:
                            <span>Selling</span>
                        </div>
                        <div class="product__detail-name">
                            {{product.name}}
                        </div>
                        <div class="product__detail-price">
                            {{(+product.price).toLocaleString('de-DE')}}đ
                        </div>
                        <div class="product__detail-stock">
                            In Stock: <span>{{product.stock}}</span>
                        </div>
                        <div class="product__detail-description">
                            <p>{{product.description}}</p>
                        </div>
                        <div class="product__detail-category">
                            Category: <span>{{product.category}}</span>
                        </div>
                        <div class="product__detail-type">
                           Type: <span> {{product.type}}</span>
                        </div>
                        <button class="edit">
                            Edit Product
                        </button>
                    </div>
                </Col>
            </Row>
        </div>

    </div>
</template>
    
<style lang='scss' scoped>
@use "../../scss/" as *;
.product {
    &__title {
        color: rgb(213, 214, 215);
        font-size: 18px;
        margin: 24px 0;
    }

    &__thumbnail {
        border-radius: 12px;
        overflow: hidden;
    }

    &__detail {
        padding: 32px;
        font-weight: 600;
        color: rgb(158, 158, 158);

        &-status {
            @include flex(center);
            color: rgb(112, 114, 117);
            span {
                margin-left: 8px;
                padding: 6px 12px;
                border-radius: 12px;
                font-size: 10px !important;
                text-transform: uppercase;
                background-color: rgb(3, 84, 63);
                color: rgba($color: #fff, $alpha: 0.8);
            }
        }

        &-name {
            font-size: 24px;
            font-weight: 600;
            color: rgba($color: #fff, $alpha: 0.8);
        }
        &-price {
            font-size: 24px;
            font-weight: 600;
            color: rgba($color: #fff, $alpha: 0.8);
        }

        &-stock {
            margin-top: 0 !important;
            text-decoration: underline;
            font-weight: 500;
        }

        &-description {
            margin-bottom: 0;
            padding-top: 12px;
            color: rgb(158, 158, 158);
            font-weight: 500;
        }

        &-type,
        &-category {
            text-transform: capitalize;
            span {
                color: rgb(112, 114, 117);
            }
        }

        &-type {
            margin-top: 2px !important;
        }

        .edit {
            margin-top: 24px;
            width: 120px;
            height: 38px;
        }

        & > * ~ * {
            margin-top: 8px;
        }
    }
}
</style>
    