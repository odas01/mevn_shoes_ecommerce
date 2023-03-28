<script>
import { Row, Col } from "ant-design-vue";
import Card from "@/components/Card.vue";

export default {
    components: {
        Row,
        Col,
        Card,
    },
    data() {
        return {
            products: [],
        };
    },
    computed: {
        name() {
            return this.$route.query.q;
        },
        count() {
            return this.products.length;
        },
    },
    methods: {
        async getProducts() {
            const response = await this.$store.dispatch("search", this.name);
            this.products = response.products;
        },
    },
    async mounted() {
        await this.getProducts();
    },
};
</script>

<template>
  <div class="search">
    <h4 class="search__title">
        Search: {{name}}({{count}})
    </h4>
    <div class="search__body">
        <Row :gutter='[{xl: 16, xs: 8}, {xl: 16, xs: 8}]'>
            <Col :xl='6' :xs="12" v-for="product, index in products">
                <Card :data="product" />
            </Col>
        </Row>
    </div>
  </div>
</template>

<style lang='scss'>
@use '../../scss' as *;
.search {
    &__title {
        text-transform: capitalize;
        font-size: 28px;
        color: rgba(0, 0, 0, 0.85);
        
        @include mobile{
            padding: 28px 20px 0;
            font-size: 24px;
        }
    }

    &__body {
        margin-top: 24px;
    }
}
</style>