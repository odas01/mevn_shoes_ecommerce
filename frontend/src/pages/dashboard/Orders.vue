<script>
import { Drawer } from "ant-design-vue";
import OrderService from "@/services/order.service";
export default {
    components: {
        Drawer,
    },
    data() {
        return { orders: [] };
    },
    mounted() {
        this.refreshList();
    },
    methods: {
        refreshList() {
            this.getOrders();
        },
        async getOrders() {
            try {
                this.orders = await OrderService.getAll();
                this.orders.forEach((user) => {
                    const date = new Date(user.updatedAt);
                    user.createdAt =
                        date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear();
                    user.updatedAt =
                        date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear();
                });
            } catch (e) {
                console.log(e);
            }
        },
        async search(e) {
            const value = e.target.value.trim();
            if (value) this.orders = await OrderService.search(value);
            else this.refreshList();
        },
    },
};
</script>
    
<template>
    <h3 class="db__title">Orders</h3>
    <div class="db__content-header">
        <input class="db__content-search" type="text" placeholder="Search by phone" @keyup.enter="search" />
    </div>
    <div class="db__body">
        <table>
            <thead>
                <tr>
                    <td width="4%"></td>
                    <td width="11%">User</td>
                    <td width="10%">Time</td>
                    <td width="25%">ADDRESS</td>
                    <td width="10%">PHONE</td>
                    <td width="5">METHOD</td>
                    <td width="15">Total cost</td>
                    <td width="10%" class="text-center">status</td>
                    <td width="10%" class="text-center">INVOICE</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order, index in orders">
                    <td class="text-center">
                        <span>{{index + 1}}</span>
                    </td>
                    <td>
                        <span class="order__userId">{{order.userId}}</span>
                    </td>
                    <td>
                        <span>{{order.createdAt}}</span>
                    </td>
                    <td>
                        <span class="order__address">{{order.address}}</span>
                    </td>
                    <td>
                        <span>{{order.phone}}</span>
                    </td>
                    <td>
                        <span>{{order.method}}</span>
                    </td>
                    <td>
                        <span>{{(order.total).toLocaleString('de-DE')}}đ</span>
                    </td>
                    <td class="text-center">
                        <span class="order__status">{{order.status}}</span>
                    </td>
                    <td class="text-center">
                        <router-link :to='{name: "dashboard.orderdetail", params:{id: order._id}}'>
                            <i class="fa-solid fa-magnifying-glass-plus" > </i>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
    
<style lang='scss' scoped>
.db__content-search {
    flex: 1;
}

.order {
    &__userId {
        width: 100px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__address {
        width: 200px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__status {
        padding: 6px 12px;
        border-radius: 12px;
        font-size: 10px !important;
        text-transform: uppercase;
        background-color: #9f580a;
        color: rgba($color: #fff, $alpha: 0.8);
    }
}

tbody {
    td:nth-child(3),
    td:nth-child(4) {
        span {
            text-transform: capitalize;
        }
    }

    td:nth-child(6) span {
        cursor: pointer;
    }
}

.ant-drawer-body {
    .checkbox {
        span {
            color: #f4f5f7;
            margin-right: 6px;
            font-size: 16px;
        }

        input {
            height: unset;
            margin-top: 4px;
        }
    }
}
</style>
    