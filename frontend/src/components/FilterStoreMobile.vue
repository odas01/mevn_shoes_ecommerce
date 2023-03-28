<script>
import { Drawer } from "ant-design-vue";
export default{
    components:{
        Drawer
    },
    props:{
        visible: {
            type: Boolean   
        }
    },
    methods:{
        closeDrawer(){
            this.$emit('closeDrawer')
        },
        filterPrice(e){
            this.$emit("filterPrice", e.target.value);
            this.closeDrawer()
        },
        setOrder(e){
            this.$emit("setOrder", e);
            this.closeDrawer()
        }
    }    
}
</script>

<template>
    <Drawer title="Filter" placement="right" :closable='false' :visible='visible' @close='closeDrawer' width='80%'>
        <div class="filter__group">
            <span class="filter__group-title">
                Sort by
            </span>
            <ul>
                <li>
                    <input type="radio" id="default" name="sort" checked @change="setOrder"/>
                    <label for="default">Default</label>
                </li>
                <li>
                    <input type="radio" id="name" name="sort" @change="setOrder"/>
                    <label for="name">Name: A-Z</label>
                </li>
                <li>
                    <input type="radio" id="name:desc" name="sort" @change="setOrder"/>
                    <label for="name:desc">Name: Z-A</label>
                </li>
                <li>
                    <input type="radio" id="price" name="sort" @change="setOrder"/>
                    <label for="price">Price: Low-High</label>
                </li>
                <li>
                    <input type="radio" id="price:desc" name="sort" @change="setOrder"/>
                    <label for="price:desc">Price: High-Low</label>
                </li>
            </ul>
        </div>
        <div class="filter__group">
            <span class="filter__group-title">
                Price
            </span>
            <ul>
                <li>
                    <input type="radio" id="pricemball" name="price" value="0" @change="filterPrice" checked />
                    <label for="priceamball">Default</label>
                </li>
                <li>
                    <input type="radio" id="pricemb1" name="price" value="0:1000000" @change="filterPrice" />
                    <label for="pricemb1"> &lt; 1.000.000đ</label>
                </li>
                <li>
                    <input type="radio" id="pricemb2" name="price" value="1000000:2000000" @change="filterPrice" />
                    <label for="pricemb2"> 1.000.000đ - 2.000.000đ</label>
                </li>
                <li>
                    <input type="radio" id="pricemb3" name="price" value="2000000:3000000" @change="filterPrice" />
                    <label for="pricemb3">2.000.000đ - 3.000.000đ</label>
                </li>
                <li>
                    <input type="radio" id="pricemb4" name="price" value="3000000:5000000" @change="filterPrice" />
                    <label for="pricemb4">3.000.000đ - 5.000.000đ</label>
                </li>
                <li>
                    <input type="radio" id="pricemb5" name="price" value="5000000" @change="filterPrice" />
                    <label for="pricemb5">&gt; 5.000.000đ</label>
                </li>
            </ul>
        </div>
    </Drawer>
</template>

<style lang="scss" scoped>
    .filter{
        &__group{
            font-size: 16px;
            padding-bottom: 12px;

            &-title{
                font-size: 18px;
            }

            ul{
                margin-top: 12px;

                li{
                    input{
                        margin-right: 8px;
                        border-color: red;
                    }
                }
                
                li ~ li{
                    margin-top: 12px;
                }
            }

            & + &{
                border-top: 1px solid #ccc;
                padding-top: 24px;
            }
        }
    }
</style>