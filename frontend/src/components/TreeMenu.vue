<script>
import { RightOutlined } from "@ant-design/icons-vue";

export default {
    components: {
        RightOutlined,
    },
    props: {
        title: {
            type: String,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        category: {
            type: String,
        },
        children: {
            type: Array,
        },
        depth: {
            type: Number,
        },
    },
    computed: {
        childrenStyle() {
            return !this.depth ? {} : { transform: `translateX(200px)` };
        },
    },
};
</script>

<template>
    <div class="tree__menu">
        <router-link v-if="title"
            :to='{ name: this.name, params: { type: this.type, category: this.category ? this.category : "all" } }'
            class="tree__title">
            <span class="tree__title-wrap">
                {{ title }}
            </span>
            <right-outlined v-if="children" />
        </router-link>
        <ul v-if="children" class="tree__children" :style='childrenStyle' :class='{ root: !this.depth }'>
            <tree-menu v-for="node in children" :title="node.title" :name='node.name' :children="node.children"
                :type='node.type' :category='node.category' :depth="depth + 1">
            </tree-menu>
        </ul>
    </div>

</template>

<style lang='scss'>
@use "../scss/" as *;

.tree__menu {
    position: relative;

    &:hover > .tree__children {
        display: block;
    }
}

.tree__title {
    display: flex;
    background-color: $white-color;
    padding: 0 10px;
    width: 100%;
    color: unset;
    text-transform: capitalize;

    &-wrap {
        width: 100%;
        height: 100%;
        padding: 10px 0;
        border-bottom: solid 1px #e5e6ec;
    }

    & .anticon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);

        & svg {
            width: 0.6rem !important;
            height: 0.6rem !important;
        }
    }

    &:hover {
        background-color: #f5f5f5;
    }
}

.tree__children {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 200px;
    padding-left: 0;
    background-color: #fff;
    box-shadow: 0px 2px 20px rgb(0 0 0 / 20%);
    z-index: 10;

    &.root {
        display: block;
        position: absolute;
        top: calc(100% + 12px);
        display: block;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;

        transform: perspective(600px) rotateX(-90deg);
        transform-origin: 0% 0%;
        transition: transform 0.5s ease, opacity 0.6s ease,
            max-height 0.6s step-end, max-width 0.6s step-end,
            padding 0.6s step-end;
    }
}
</style>