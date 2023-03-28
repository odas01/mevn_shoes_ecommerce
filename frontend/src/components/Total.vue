<script>
import { Row, Col } from "ant-design-vue";
import { number } from "yup/lib/locale";
export default {
    components: {
        Row,
        Col,
    },
    props: {
        modelValue: { type: Object },
        length: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        totalAmount: { type: Number, default: 0 },
    },
    emits: ["update:modelValue", "addOrder"],
    methods: {
        createOrder() {
            this.$emit("addOrder");
        },
    },
    computed: {
        discount() {
            if (this.modelValue.discount) {
                return this.modelValue.discount.includes("abc") ? 70000 : 0;
            }
            return 0;
        },
    },
};
</script>
<template>
    <div class="total">
        <div class="total__top">
            <span><b style="font-weight: bold !important;">Items:</b> {{length}}</span>
        </div>
        <div class="total__body">          
            <Row :gutter='24'>
                <Col :xl="12" :xs="24">
                    <div class="total__message">
                        <label for="message">Message: </label>
                        <textarea name="message" placeholder="Message for shop" rows="2" v-model="modelValue.message"></textarea>
                    </div>
                </Col>
                <span></span>
                <Col :xl="12" :xs="24">
                    <div class="total__shipping">
                        <label for="shipping">Shipping</label>
                        <select id="shipping" name="shipping" v-model="modelValue.ship" :disabled="!length">
                            <option value="Normal">
                                Normal - 0₫
                            </option>
                            <option value="Express">
                                Express delivery - 30.000₫ - 2 day
                            </option>
                            <option value="Economical">
                                Economical shipping - 10.000₫ - 3 to 4 days
                            </option>
                        </select>
                    </div>
                    <div class="total__discount">
                        <label for="discount">Voucher</label>
                        <input type="text" name="discount" placeholder="Enter 'abc' for discount" :disabled="!length" v-model="modelValue.discount" />
                        <span v-if="modelValue.discount && modelValue.discount.includes('abc')" class="total__message">Valid</span>
                        <span v-if="modelValue.discount && !modelValue.discount.includes('abc')" class="total__message total__message--error">
                            Invalid discount code
                        </span>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="total__amount">
            <Row justify='end'>
                <Col :xl="3" :xs="12">
                    <span class="total__amount-title">Total amount: </span>
                    <span class="total__amount-title">Shipping cost: </span>
                    <span class="total__amount-title">Discount amount: </span>
                    <span class="total__amount-title">Total payment: </span>
                </Col>
                <Col :xl="4" :xs="12">
                    <span>{{new Intl.NumberFormat('de-DE').format(totalAmount)}}đ</span>
                    <span>{{new Intl.NumberFormat('de-DE').format(modelValue.shipCost)}}đ</span>
                    <span>{{new Intl.NumberFormat('de-DE').format(discount)}}đ</span>
                    <span class="total__amount-payment">{{new Intl.NumberFormat('de-DE').format(total)}}đ</span>
                </Col>
            </Row>
        </div>
        <div class="total__buy">
            <button :class="{disabled: !length}" :disabled="!length" @click="createOrder">Buy</button>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@use "../scss/" as *;

.total {
    padding: 12px 0 !important;
    position: relative;
    font-size: 14px;

    &__top {
        @include flex(center, space-between);
        font-style: italic;

        span {
            font-size: 18px;
        }
    }

    &__body {
        margin-top: 20px;
        border-bottom: 2px solid #2496ed;

        label {
            width: 60px;
        }
    }

    &__message {
        display: flex;
        textarea {
            width: 70%;
            margin-left: 12px;
            padding: 6px 12px;
            border: 1px solid rgba(0, 0, 0, 0.4);

            @include mobile{
                flex: 1;
            }
        }

        @include mobile{
            margin-bottom: 20px;
        }
    }

    &__shipping {
        display: flex;
        select {
            border: 1px solid rgba(0, 0, 0, 0.4);
            width: 70%;
            padding: 6px 12px;
            margin-left: 12px;

            @include mobile{
                flex: 1;
            }
        }
    }

    &__discount {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        padding-bottom: 20px;

        
        @include mobile{
            flex-wrap: wrap; 

            input{
                flex: 1;
                min-width: 200px;
            }
        }

        label {
            display: inline-block;
        }

        input {
            border: 1px solid rgba(0, 0, 0, 0.4);
            width: 70%;
            padding: 6px 12px;
            margin-left: 12px;

        }

        span {
            margin-left: 72px;
            margin-top: 8px;
            font-size: 14px;
            color: #2ecc71;

        }

        .total__message--error {
            color: #d63031;
        }

    }

    &__amount {
        margin-bottom: 12px;
        padding: 24px 0;
        font-size: 16px;

        &-payment {
            color: rgb(14, 159, 110);
            font-size: 20px;
            font-weight: 600;
        }

        span {
            margin-bottom: 8px;
            display: block;

            &:not(.total__amount-title) {
                text-align: right;
            }
        }
    }

    &__buy {
        text-align: right;
        button {
            bottom: 0;
            right: 0;
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
    }
}

.cart__noCart {
    @include flex(initial, space-between);
    padding-top: 20px;
}
</style>