<script>
import OrderService from "@/services/order.service";
export default {
    data() {
        return {
            invoice: {},
        };
    },
    mounted() {
        this.refreshList();
    },
    methods: {
        refreshList() {
            this.getInvoiice();
        },
        async getInvoiice() {
            const id = this.$route.params.id;
            try {
                this.invoice = await OrderService.get(id);
                this.invoice.createdAt = new Date(
                    this.invoice.createdAt
                ).toDateString();
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
    
<template>
<div class="db__body">
    <div class="invoice">
        <h4 class="invoice__title">INVOICE</h4>
        <div class="invoice__body">
            <div class="invoice__status">
                STATUS: <span>{{invoice.status}}</span>
            </div>
            <div class="invoice__wrap">
                <div class="invoice__info">
                    <div>
                        DATE
                        <p>{{invoice.createdAt}}</p>
                    </div>
                    <div class="invoice__info-to">
                        INVOICE TO.
                        <p>{{invoice.phone}}</p>
                        <p>{{invoice.address}}</p>
                        <p>{{invoice.userId?.email}}</p>
                        <p class="invoice__info-mess"><span>Message:</span>{{invoice.message}}</p>
                    </div>
                </div>
                <div class="invoice__order">
                    <table>
                        <thead>
                            <tr>
                                <td width="5%"></td>
                                <td width="45%">Product name</td>
                                <td width="10%">size</td>
                                <td width="10%">quantity</td>
                                <td width="15%">price</td>
                                <td width="15%">amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="detail, index in invoice.details">
                                <td>
                                    <span>{{index + 1}}</span>
                                </td>
                                <td>
                                    <span>{{detail.productId.name}}</span>
                                </td>
                                <td>
                                    <span>{{detail.size}}</span>
                                </td>
                                <td>
                                    <span>{{detail.qty}}</span>
                                </td>
                                <td>
                                    <span>{{(detail.productId.price).toLocaleString('de-DE')}}đ</span>
                                </td>
                                <td>
                                    <span>{{(detail.productId.price * detail.qty).toLocaleString('de-DE')}}đ</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="invoice__total">
                    <div>
                        PAYMENT METHOD
                        <p>{{invoice.method}}</p>
                    </div>
                    <div>
                        SHIPPING METHOD
                        <p>{{invoice.ship}}</p>
                    </div>
                    <div>
                        SHIPPING COST
                        <p>{{(+invoice.shipCost).toLocaleString('de-DE')}}đ</p>
                    </div>
                    <div>
                        DISCOUNT
                        <p>{{(+invoice.discount).toLocaleString('de-DE')}}đ</p>
                    </div>
                    <div>
                        TOTAL AMOUNT
                        <p>{{(+invoice.total).toLocaleString('de-DE')}}đ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
    
<style lang='scss' scoped>
@use "../../scss/" as *;
.invoice {
    padding: 32px;

    &__title {
        font-size: 20px;
        color: #fff;
    }

    &__status {
        color: rgb(112, 114, 117);
        padding-bottom: 24px;
        border-bottom: 1px solid rgb(36, 38, 45);

        span {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px !important;
            text-transform: uppercase;
            background-color: #9f580a;
            color: rgba($color: #fff, $alpha: 0.8);
        }
    }

    &__info {
        @include flex(initial, space-between);
        padding-top: 16px;
        color: rgb(112, 114, 117);

        &-to {
            text-align: right;
        }

        &-mess {
            width: 500px;
            span {
                margin-right: 8px;
                text-decoration: underline;
            }
        }

        p {
            color: rgb(158, 158, 158);
            margin-bottom: 0;

            &:first-child {
                margin-top: 4px;
            }
        }
    }
    &__order {
        margin: 32px 0;

        td:not(:nth-child(2)) {
            text-align: center;
        }
    }

    &__total {
        @include flex(initial, space-between);
        background-color: #121317;
        color: #707275;
        font-weight: 600;
        padding: 24px 32px;
        border-radius: 12px;

        p {
            color: rgb(158, 158, 158);
            margin-bottom: 0;
            margin-top: 4px;
        }

        div:last-child {
            p {
                font-size: 20px;
                color: rgb(14, 159, 110);
            }
        }
    }
    & > * {
        font-weight: 600;
    }
    & p {
        font-weight: 500;
    }
}
</style>
    