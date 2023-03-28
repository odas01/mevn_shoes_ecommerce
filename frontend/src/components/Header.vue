<script>
import { Drawer } from "ant-design-vue";
import {
    SearchOutlined,
    ShoppingCartOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons-vue";
import { Row, Col } from "ant-design-vue";

export default {
    components: {
        SearchOutlined,
        ShoppingCartOutlined,
        UserSwitchOutlined,
        Row,
        Col,
        Drawer
    },
    computed: {
        name() {
            return this.$store.state.user.name;
        },
        isAdmin() {
            return this.$store.state.user.role === "admin";
        },
    },
    data() {
        return {
            isShow: false,
            visible: false,
            category:[
                {
                    type: 'men',
                    child: ['running', 'football', 'gym', 'basketball', 'tenis']
                },
                {
                    type: 'women',
                    child: ['running', 'football', 'gym', 'basketball', 'tenis']
                },
                {
                    type: 'kid',
                    child: ['running', 'football', 'basketball']
                }
            ]
        };
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
            location.reload();
        },
        changePassword() {
            const token = localStorage.getItem("token_user");
        },
        async search(e) {
            if (e.target.value.trim()) {
                location.replace("/search?q=" + e.target.value.trim());
            }
        },
        showDrawer(){
            this.visible = true;
        },
        closeDrawer(){
            this.visible = false;
        },
        showCate(e){
            const cateNode = e.target.parentNode.nextElementSibling;
            cateNode.classList.toggle('show')
        }
    },
};
</script>

<template>
    <div class="header displayBox">
    <div class="container">
        <Row :gutter='8' :wrap="true">
            <Col :xl="{span: 4 , order: 1}" :md="4" :xs="8">
                <router-link :to="{ name: 'home' }" class="header__logo">
                    <img src="../assets/image/logo.png" alt="" />
                </router-link>
            </Col>
            <Col :xl="{span: 12 , order: 2}" :xs="{span: 24 , order: 2}">
                <div class="header__search">
                    <input type="text" placeholder="Enter your product..." @keyup.enter='search'/>
                    <search-outlined class="search-btn" width="16px" height="2em" />
                </div>
            </Col>
            <Col :xl='{span: 8 , order: 3}' :xs="16">
                <Row :gutter='8'  class="header__group">
                    <Col :span='10' class="d-flex align-items-center">
                        <div v-if='!name' class="header__group-auth">
                            <user-switch-outlined />
                            <div class="header__group-auth--wrap">
                                <router-link :to="{ name: 'auth.login' }" class="header__group-auth--login">
                                    <span>Sign In</span>
                                </router-link>
                                <router-link :to="{ name: 'auth.register' }">
                                    <span>Sign Up</span>
                                </router-link>
                            </div>
                        </div>
                        <div v-else class="header__group-isUser">
                            <img src="../assets/image/category/men.png" alt="">
                            <span class="header__group-name">{{name}}</span>
                            <ul class="header__group-dropdown" ref="dropdown">
                                <li v-if="isAdmin">
                                    <a href="/dashboard">
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                        <button>Dashboard</button>
                                    </a>
                                </li>
                                <li>
                                    <a href="/auth/changePassword">
                                        <i class="fa-solid fa-lock"></i>
                                        <button>Change password</button>
                                    </a>
                                </li>
                                <li>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <button @click='logout'>Log out</button>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col :span='8'>
                        <router-link :to="{ name: 'cart' }" class=" header__group-cart">
                            <shopping-cart-outlined width="2em" height="2em" />
                            <span>{{ this.$store.state.quantityCart }}</span>
                        </router-link>
                    </Col>
                </Row>
                <div class="header__mobile">
                    <router-link :to="{ name: 'cart' }">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </router-link>
                    <i class="fa-solid fa-bars" @click="showDrawer"></i>
                    <Drawer placement="right" :closable='false' :visible='visible' @close='closeDrawer' width='80%'>
                        <div class="drawer__top" v-if='!name'>
                            <router-link :to="{ name: 'auth.login' }">
                                    <span>Sign In</span>
                            </router-link>
                            <router-link :to="{ name: 'auth.register' }">
                                <span>Sign Up</span>
                            </router-link>
                        </div>
                        <div class="drawer__top drawer__top-isUser" v-else>
                            <img src="../assets/image/category/men.png" alt="">
                            <span>{{name}}</span>
                        </div>
                        <div class="drawer__body">
                            <div v-for="item in category" class="drawer__body-wrap">
                                <div>
                                    <div class="drawer__body-type">
                                        <router-link :to='{ name: "category.show", params:{type: item.type, category: "all"} }' @click='closeDrawer'>
                                            <span>{{item.type}}</span>
                                        </router-link>
                                        <i class="fa-sharp fa-solid fa-chevron-right"  @click="showCate"></i>
                                    </div>
                                    <div class="drawer__body-cate">
                                        <router-link  v-for="cate in item.child" :to='{ name: "category.show", params:{type: item.type, category: cate} }' @click='closeDrawer'>
                                            <span>{{cate}}</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="drawer__bottom" v-if='name'>
                            <div>
                                <a href="/dashboard" v-if="isAdmin">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <button>Dashboard</button>
                                </a>
                            </div>
                            <div>
                                <a href="/auth/changePassword">
                                    <i class="fa-solid fa-lock"></i>
                                    <button>Change password</button>
                                </a>
                            </div>
                            <div>
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <button @click='logout'>Log out</button>
                            </div>
                        </div>
                    </Drawer>
                </div>
            </Col>
        </Row>
    </div>
    
</div>

</template>

<style lang='scss' scoped>
@use "../scss/" as *;

.header {
    height: $header-h;
    background-color: $header-color;
    color: $white-color;
    padding: 5px;

    @include mobile{
        height: unset;
        padding-bottom: 8px;
    }

    &__logo {
        @include flex(center);
        height: calc($header-h - 10px);
    }

    &__search {
        @include flex(center);
        $height: 40px;

        margin-top: 5px;
        height: $height;
        width: 100%;
        background-color: $white-color;
        padding: 5px 2px 5px 0;
        border-radius: 4px;

        input {
            flex: 1;
            outline: none;
            border: none;
            padding-left: 12px;
            color: $black-color;
        }

        .search-btn {
            @include flex(center, center);
            width: 80px;
            height: calc($height - 4px);
            background-color: $black-color;
            border-radius: 4px;
        }

        @include mobile{
            $height:36px;
            
            input{
                font-size: 14px;
            }

            .search-btn{
                width: 60px;

               & > svg{
                color: red;
               }
            }
        }
    }

    &__group {
        height: 100%;
        align-items: center;
        justify-content: end;

        &-auth {
            @include flex(center);

            &--wrap {
                display: flex;
                flex-direction: column;

                & span {
                    font-size: 13px;
                    transition: color 0.15s ease;
                    cursor: pointer;

                    &:hover {
                        color: #0984e3;
                    }
                }
            }

            &--login {
                & span {
                    font-size: 15px;
                }
            }
        }

        &-isUser {
            @include flex(center);
            position: relative;
            cursor: pointer;
            img {
                width: 32px;
                border-radius: 100rem;
                border: 1px solid rgba($color: #000000, $alpha: 0.1);
            }

            span {
                font-size: 16px;
                margin-left: 4px;
            }

            &::before {
                content: "";
                position: absolute;
                top: calc(100% - 10px);
                width: 100%;
                height: 20px;
                background-color: transparent;
            }

            &:hover > ul {
                opacity: 1;
                visibility: visible;
            }
        }

        &-dropdown {
            position: absolute;
            top: calc(100% + 5px);
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            background-color: #202020;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            width: max-content;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            border-radius: 4px;
            transition: all 0.3s ease;
            li {
                padding: 12px 24px;
                transition: all 0.1s ease;

                button {
                    margin-left: 12px;
                    color: $white-color;
                    background-color: transparent;
                }

                &:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }
            }
        }

        &-cart {
            position: relative;
            @include flex(center);

            & span:last-child {
                position: absolute;
                top: -10px;
                left: 32px;
                color: $black-color;
                background-color: $white-color;
                border-radius: 100rem;
                padding: 4px 8px;
                font-size: 8px;
                font-weight: 600;
            }
        }

        & span:first-child {
            margin-left: 8px;
        }

        
        @include mobile{
            display: none
        }
    }

    &__mobile{
        display: none;

        @include mobile{
            @include flex(center, flex-end);
            height: 100%;
            i{
                font-size: 20px;
                margin-left: 40px;
            }
        }
    }
}

.drawer{
    &__top{
        @include flex(center, space-around);
        font-size: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);

        &-isUser{
            justify-content: center;

            span{
                font-size: 18px;
                font-weight: 600;
                margin-left: 12px;
            }
            
            img{
                width: 40px;
                border-radius: 100rem;
            }
        }
    }

    &__body{
        padding: 20px 12px 0;

        &-type{
            @include flex(center, space-between);
        }

        &-cate{
            display: none;
            margin-left: 32px;

            a{
                display: block;
            }
            &.show{
                display: block;
            }

            span{
                font-size: 20px !important;
            }
        }

        span{
            font-size: 24px;
            text-transform: capitalize
        }
    }

    &__bottom{
        position: absolute;
        bottom: 10px;
        font-size: 20px;

        div{
            padding: 12px;
        }

        button{
            background-color: transparent
        }

        i{
            margin-right: 12px;
        }
    }
}

.ant-col-12 {
    @include flex(center);
}
</style>