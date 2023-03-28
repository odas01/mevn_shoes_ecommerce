<script>
import { DownOutlined } from "@ant-design/icons-vue";
import TreeMenu from "./TreeMenu.vue";

const navbars = [
    {
        name: "home",
        title: "Home",
    },
    {
        name: "home",
        title: "Category",
        isCategory: true,
    },
    // {
    //     name: "introduce",
    //     title: "Introduce",
    // },
    {
        name: "contact",
        title: "Contact",
    },
];

const categorys = {
    children: [
        {
            name: "category.show",
            title: "men",
            type: "men",
            children: [
                {
                    name: "category.show",
                    title: "running",
                    type: "men",
                    category: "running",
                },
                {
                    name: "category.show",
                    title: "football",
                    type: "men",
                    category: "football",
                },
                {
                    name: "category.show",
                    title: "basketball",
                    type: "men",
                    category: "basketball",
                },
                {
                    name: "category.show",
                    title: "Tennis",
                    type: "men",
                    category: "tennis",
                },
                {
                    name: "category.show",
                    title: "Gym",
                    type: "men",
                    category: "gym",
                },
            ],
        },
        {
            name: "category.show",
            title: "women",
            type: "women",
            children: [
                {
                    name: "category.show",
                    title: "running",
                    type: "women",
                    category: "running",
                },
                {
                    name: "category.show",
                    title: "football",
                    type: "women",
                    category: "football",
                },
                {
                    name: "category.show",
                    title: "basketball",
                    type: "women",
                    category: "basketball",
                },
                {
                    name: "category.show",
                    title: "Tennis",
                    type: "women",
                    category: "tennis",
                },
                {
                    name: "category.show",
                    title: "Gym",
                    type: "women",
                    category: "gym",
                },
            ],
        },
        {
            name: "category.show",
            title: "kid",
            type: "kid",
            children: [
                {
                    name: "category.show",
                    title: "running",
                    type: "kid",
                    category: "running",
                },
                {
                    name: "category.show",
                    title: "football",
                    type: "kid",
                    category: "football",
                },
                {
                    name: "category.show",
                    title: "basketball",
                    type: "kid",
                    category: "basketball",
                },
            ],
        },
    ],
};

export default {
    components: {
        DownOutlined,
        TreeMenu,
    },

    data() {
        return {
            navbars,
            categorys,
        };
    },
};
</script>

<template>
    <div class="navbar">
        <router-link :to="{ name: navbar.name}" class="navbar__item " v-for="navbar in navbars"
            :class='{ has__children: navbar.isCategory }'>
            {{ navbar.title }}

            <tree-menu v-if="navbar.isCategory" :name="categorys.name" :children="categorys.children" :depth="0">
            </tree-menu>

        </router-link>
    </div>
</template>

<style lang='scss' >
@use "../scss/" as *;

.navbar {
    @include flex(initial, center);
    &__item {
        position: relative;
        font-size: 18px;
        color: unset;

        &:not(.has__children)::before {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #959595;
            border-radius: 100rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.15s linear;
        }

        &.router-link-exact-active::before {
            opacity: 1;
            visibility: visible;
        }

        &.has__children::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 20px;
            background: transparent;
            bottom: -15px;
            left: 0;
        }

        &.has__children:hover > .tree__menu > .tree__children.root {
            overflow: visible;
            opacity: 1;
            max-height: 3000px;
            max-width: 3000px;
            -webkit-transform: perspective(600px) rotateX(0deg);
            -moz-transform: perspective(600px) rotateX(0deg);
            -ms-transform: perspective(600px) rotateX(0deg);
            -o-transform: perspective(600px) rotateX(0deg);
            transform: perspective(600px) rotateX(0deg);
            -webkit-transition: -webkit-transform 0.5s ease, opacity 0.2s ease,
                max-height 0s step-end, max-width 0s step-end,
                padding 0s step-end;
            -o-transition: -o-transform 0.5s ease, opacity 0.2s ease,
                max-height 0s step-end, max-width 0s step-end,
                padding 0s step-end;
            transition: transform 0.5s ease, opacity 0.2s ease,
                max-height 0s step-end, max-width 0s step-end,
                padding 0s step-end;
        }
    }

    & > * ~ * {
        margin-left: 28px;
    }

    @include mobile{
        display: none;
    }
}
</style>