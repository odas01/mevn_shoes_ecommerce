<script>
export default {
    data() {
        return {
            heightLiElement: 30,
            sizes: [36, 37, 38, 39, 40, 41, 42, 43],
            filter: {
                price: "all",
                size: "all",
            },
        };
    },
    mounted() {
        document.querySelectorAll(".filter__list").forEach((ulItem) => {
            ulItem.style.height = `${
                ulItem.children.length * this.heightLiElement
            }px`;
        });
    },
    methods: {
        handleScroll(e) {
            //get scrollElement
            const element = !e.target.classList.contains("filter__scroll")
                ? e.target.parentNode
                : e.target;

            //toggle class 'scroll'
            element.classList.toggle("scroll");
            const isScroll = element.classList.contains("scroll");

            //get ulElement
            const filterListItem = element.nextSibling;
            filterListItem.style.height = !isScroll
                ? `${filterListItem.childNodes.length * this.heightLiElement}px`
                : "0px";
        },
        getPriceFilter(e) {
            this.$emit("filterPrice", e.target.value);
        },
        getSizeFilter(e) {
            this.filter.size = e.target.value;
        },
    },
};
</script>

<template>
   <div class="filter">
    <div class="filter__group">
        <h5 class="filter__title">Giá</h5>
        <div class="filter__scroll" @click="handleScroll">
            <i class="fa-solid fa-plus filter__scroll-plus"></i>
            <i class="fa-solid fa-minus filter__scroll-minus"></i>
        </div>
        <ul class="filter__list">
            <li>
                <input type="radio" id="priceall" name="price" value="0" @change="getPriceFilter" checked />
                <label for="priceall">Tất cả</label>
            </li>
            <li>
                <input type="radio" id="price1" name="price" value="0:1000000" @change="getPriceFilter" />
                <label for="price1">Dưới 1.000.000đ</label>
            </li>
            <li>
                <input type="radio" id="price2" name="price" value="1000000:2000000" @change="getPriceFilter" />
                <label for="price2"> 1.000.000đ - 2.000.000đ</label>
            </li>
            <li>
                <input type="radio" id="price3" name="price" value="2000000:3000000" @change="getPriceFilter" />
                <label for="price3">2.000.000đ - 3.000.000đ</label>
            </li>
            <li>
                <input type="radio" id="price4" name="price" value="3000000:5000000" @change="getPriceFilter" />
                <label for="price4">3.000.000đ - 5.000.000đ</label>
            </li>
            <li>
                <input type="radio" id="price5" name="price" value="5000000" @change="getPriceFilter" />
                <label for="price5">Trên 5.000.000đ</label>
            </li>
        </ul>
    </div>
    <div class="filter__group">
        <h5 class="filter__title">Kích thước</h5>
        <div class="filter__scroll" @click="handleScroll">
            <i class="fa-solid fa-plus filter__scroll-plus"></i>
            <i class="fa-solid fa-minus filter__scroll-minus"></i>
        </div>
        <ul class="filter__list">
            <li>
                <input type="radio" id="sizeall" name="size" value="all" @change="getSizeFilter" checked />
                <label for="sizeall">Tất cả</label>
            </li>
            <li v-for="size, index in sizes">
                <input type="radio" :id="`size${index+1}`" name="size" :value="`${size}`" @change="getSizeFilter" />
                <label :for="`size${index+1}`">{{size}}</label>
            </li>
        </ul>
    </div>
</div>

</template>

<style lang='scss' scoped>
@use "../scss/" as *;

.filter {
    padding: 10px 0;

    &__title {
        font-size: 17px;
        font-weight: 600;
    }

    &__group {
        position: relative;
        padding: 10px 20px;
        background-color: rgba($color: #000, $alpha: 0.02);
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

        + & {
            margin-top: 12px;
        }
    }

    &__list {
        overflow: hidden;
        transition: height 0.2s ease;

        & li {
            padding: 3px 0;
            @include flex(center, flex-start);

            & label {
                margin-left: 6px;
                font-size: 15px;
                cursor: pointer;
                color: #282828;
            }
        }

        & input {
            cursor: pointer;
        }
    }

    &__scroll {
        position: absolute;
        right: 15px;
        top: 7px;
        cursor: pointer;

        &-plus {
            display: none;
        }

        &.scroll &-minus {
            display: none;
        }

        &.scroll &-plus {
            display: inline;
        }
    }
}
</style>