<script>
import { Drawer } from "ant-design-vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
export default {
    components: {
        Drawer,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Name is required.")
                .min(2, "At least 6 characters.")
                .max(50, "Tên có nhiều nhất 30 ký tự."),
            type: yup.string().required("Type is required."),
            category: yup.string().required("Category is required."),
            price: yup.number().required("Price is required."),
            discount: yup
                .number()
                .required("Discount is required.")
                .max(100, "Giảm giá nhiều nhất 100%"),
            size: yup
                .string()
                .required(
                    "Size is required. Multiple sizes separated by space"
                ),
            stock: yup
                .number()
                .required("Store is required.")
                .min(10, "Số lượng ít nhất 10 sản phẩm")
                .max(200, "Số lượng nhiều nhất 200 sản phẩm"),
            description: yup.string(),
        });
        return {
            products: [],
            totalProducts: 0,
            productEdit: {},
            categorys: [],
            categoryActive: {},
            visible: false,
            isUpload: true,
            isSearch: false,
            isFilter: false,
            idEdit: "",
            contactFormSchema,
            limit: 15,
            pageCur: 0,
            newProducts: [],
            filter: {},
        };
    },
    computed: {
        paginationCount() {
            const length = this.totalProducts;
            if (length % this.limit === 0) return length / this.limit;
            return parseInt(length / this.limit) + 1;
        },
        nextTotal() {
            if ((this.pageCur + 1) * this.limit < this.totalProducts)
                return (this.pageCur + 1) * this.limit;
            return this.totalProducts;
        },
        converCategory() {
            return ["men", "women", "kid"].reduce((cur, type) => {
                const children = this.categorys
                    .map((category) => {
                        return category.types.includes(type) && category.name;
                    })
                    .filter((category) => category);
                return [...cur, { name: type, children }];
            }, []);
        },
    },
    watch: {
        pageCur() {
            this.refreshList();
        },
    },
    async mounted() {
        if (this.products.length > 0)
            document
                .querySelector("table")
                .querySelectorAll("i")
                .forEach((icon) => new Tooltip(icon));
        this.refreshList();
        await this.getCategorys();
    },
    methods: {
        showDrawer() {
            this.visible = true;
        },
        closeDrawer() {
            this.visible = false;
            this.idEdit = "";
            this.isUpload = true;
            this.productEdit = {};
        },
        showDrawerEdit(product) {
            this.productEdit = product;
            this.idEdit = product._id;
            this.isUpload = false;
            this.setCategory(product.type);
            this.showDrawer();
        },
        //convert func
        convertBase64(file) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    resolve(fileReader.result);
                };

                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        },
        refreshList() {
            this.getProducts();
        },
        changeStatus(product) {
            product.open = !product.open;
            this.editProduct(product._id, { open: product.open });
        },
        setCategory(type) {
            this.categoryActive = this.converCategory.find(
                (category) => category.name === type
            );
        },
        setFilter(e, type) {
            this.filter[type] = e.target.value;
            Object.keys(this.filter).forEach(
                (key) => this.filter[key] === "" && delete this.filter[key]
            );
            this.isFilter = !!Object.keys(this.filter).length;
            if (this.isFilter) this.filterProducts();
            else this.refreshList();
        },
        changePagination(index) {
            this.pageCur = index - 1;
        },
        toDetail(id) {
            this.$router.push({
                name: "dashboard.productdetail",
                params: { id },
            });
        },

        //curl
        async getProducts() {
            try {
                const respone = await ProductService.getAll(
                    this.pageCur * this.limit,
                    this.limit
                );
                this.products = respone.products;
                this.products.forEach((product) => {
                    product.image = "data:image/png;base64," + product.image;
                    product.size = product.size.join(" ");
                });

                this.totalProducts = respone.totalProducts;
            } catch (error) {
                console.log(error);
            }
        },
        async upLoadProduct(data) {
            try {
                data.open = true;
                await ProductService.create(data);
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },
        async editProduct(id, data) {
            try {
                await ProductService.update(id, data);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(id, event) {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProductService.delete(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async seacrhProducts(e) {
            const value = e.target.value.trim();
            this.isSearch = !!value;
            if (value) {
                try {
                    this.products = (
                        await ProductService.search({ name: value })
                    ).products;
                    this.products.forEach((product) => {
                        product.image =
                            "data:image/png;base64," + product.image;
                        product.size = product.size.join(" ");
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {
                this.refreshList();
            }
        },
        async submitForm(values, { resetForm }) {
            if (values.image) {
                const base64 = await this.convertBase64(values.image);
                values.image = base64.slice(base64.indexOf(",") + 1);
            } else delete values.image;

            if (values.otherImages) {
                const otherImages = await Promise.all(
                    values.otherImages.map(async (value) => {
                        const base64 = await this.convertBase64(value);
                        return base64.slice(base64.indexOf(",") + 1);
                    })
                );
                values.otherImages = otherImages;
            } else delete values.otherImages;
            values.size = values.size.split(" ").map((item) => +item);
            console.log(values);
            !this.isUpload
                ? await this.editProduct(this.idEdit, values)
                : await this.upLoadProduct(values);
            this.closeDrawer();
            resetForm();
        },
        async getCategorys() {
            try {
                this.categorys = await CategoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async filterProducts() {
            try {
                this.products = (await ProductService.filter(this.filter)).data;
                this.products.forEach((product) => {
                    product.image = "data:image/png;base64," + product.image;
                    product.size = product.size.join(" ");
                });
            } catch (error) {
                console.log(error);
            }
        },
        async abc(id, event){
            try{
                const abc = await ProductService.get(id);
                console.log(abc);
            }catch(e){
                console.log(e)
            }
        }
    },
};
</script>

<template>
    <h3 class="db__title">Products</h3>
        <div class="db__content-header">
            <input class="db__content-search" type="text" placeholder="Search by product name" @keyup.enter="seacrhProducts" />
            <select name="type" id="" @change='setFilter($event, "category")'>
                <option value="">--- Category ---</option>
                <option v-for="cate in categorys" :value="cate.name" >{{cate.name}}</option>
            </select>
            <select name="type" id="" @change='setFilter($event, "type")'>
                <option value="">--- Type ---</option>
                <option value="men" >Men</option>
                <option value="women" >Women</option>
                <option value="kid" >Kid</option>
            </select>
            <select name="price" id="" @change='setFilter($event, "sort")'>
                <option value="">--- Price ---</option>
                <option value="name">Name: A-Z</option>
                <option value="name:desc">Name: Z-A</option>
                <option value="price">Price: Low-High</option>
                <option value="price:desc">Price: High-Low</option>
            </select>
            <button @click="showDrawer">+ Add product</button>
        </div>
        <Drawer :title="!idEdit ? 'ADD PRODUCT' :'edit product'"  placement="right" :closable='true' :visible='visible' @close='closeDrawer'>
            <Form class="db__add" @submit='submitForm' ref="form"
                :validation-schema="contactFormSchema">
                <div >
                    <label for="name">Name</label>
                    <Field type="text" name="name" v-model="productEdit.name" />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div>
                    <label for="image">Image</label>
                    <Field type="file" accept="image/*" name="image"  />
                    <ErrorMessage name="image" class="error-feedback" />
                </div>
                <div>
                    <label for="otherImages">Other Images</label>
                    <Field type="file" accept="image/*" name="otherImages"  multiple />
                    <ErrorMessage name="otherImages" class="error-feedback" />
                </div>
                <div>
                    <label for="type">Type</label>
                    <Field as='select' name="type" id="" v-model="productEdit.type"
                        @change="setCategory($event.target.value)">
                        <option v-for="category in converCategory" :value="category.name">{{category.name}}</option>
                    </Field>
                    <ErrorMessage name="type" class="error-feedback" />
                </div>
                <div>
                    <label for="category">Category</label>
                    <Field as='select' name="category" id="" v-model="productEdit.category">
                        <option v-for="category in categoryActive.children" :value="category">{{category}}</option>
                    </Field>
                    <ErrorMessage name="category" class="error-feedback" />
                </div>
                <div>
                    <label for="price">Price</label>
                    <Field type="number" name="price" v-model="productEdit.price" />
                    <ErrorMessage name="price" class="error-feedback" />
                </div>
                <div>
                    <label for="discount">Discount</label>
                    <Field type="number" name="discount" v-model="productEdit.discount" />
                    <ErrorMessage name="discount" class="error-feedback" />
                </div>
                <div>
                    <label for="size">Size</label>
                    <Field type="text" name="size" v-model="productEdit.size" />
                    <ErrorMessage name="size" class="error-feedback" />
                </div>
                <div>
                    <label for="stock">Stock</label>
                    <Field type="input" name="stock" v-model="productEdit.stock" />
                    <ErrorMessage name="stock" class="error-feedback" />
                </div>
                <div>
                    <label for="description">Description</label>
                    <Field as='textarea' type="text" name="description" rows="3" v-model="productEdit.description">
                    </Field>
                    <ErrorMessage name="description" class="error-feedback" />
                </div>
                <div class="db__add-btn">
                    <button type="submit">{{!!idEdit ? 'Edit' : 'Add'}}</button>
                </div>
            </form>
        </Drawer>
    <div class="db__body" v-if="products.length > 0">
        <table>
            <thead>
                <tr>
                    <td width="4%"></td>
                    <td width="28%">product name</td>
                    <td width="12%">category</td>
                    <td width="6%">type</td>
                    <td width="10%">price</td>
                    <td width="6%">discount</td>
                    <td width="6%">stock</td>
                    <td class="text-center" width="10% ">status</td>
                    <td class="text-center" width="8%">published</td>
                    <td width="10%"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product, index in products">
                    <td class="text-center">
                        <span>{{pageCur*limit + index + 1}}</span>
                    </td>
                    <td>
                        <div @click="abc(product._id, $event)">
                            <img :src="product.image " alt="" class="me-3" />
                            <span class="product__name">{{product.name}}</span>
                        </div>
                    </td> 
                    <td>
                        <span class="product__category">{{product.category}}</span>
                    </td>
                    <td style="text-transform: capitalize;">
                        <img :src="`/src/assets/image/category/${product.type}.png`" alt="" />
                    </td>
                    <td>
                        <span>{{(product.price).toLocaleString('de-DE')}}đ</span>
                    </td>
                    <td>
                        <span>{{product.discount}}%</span>
                    </td>
                    <td>
                        <span>{{product.stock}}</span>
                    </td>
                    <td class="text-center">
                        <span class="product__status" v-if='product.stock>0'>Selling</span>
                        <span class="product__status product__status-soldout" v-else>Sold Out</span>
                    </td>
                    <td class="text-center">
                        <span class="px-1 py-1" @click="changeStatus(product)">
                            <svg v-if="product.open" stroke="currentColor" style="color: #0e9f6e;" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                            </svg>
                            <svg v-else stroke="currentColor" fill="currentColor" style="color: #e74c3c;" stroke-width="0" viewBox="0 0 16 16" class="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                            </svg>
                        </span>
                    </td>
                    <td>
                        <div  class="product__actions">
                            <i class="fa-solid fa-magnifying-glass-plus" @click='toDetail(product._id)'></i>
                            <i class="fa-solid fa-pen-to-square"  @click="showDrawerEdit(product)"> </i>
                            <i class="fa-regular fa-trash-can"  @click="deleteProduct(product._id, $event)"> </i>
                        </div>
                    </td> 
                </tr>
            </tbody>
        </table>
        
        <div class="pagi" v-if="!isSearch && !isFilter"> 
            <div>
                SHOWING
                <span>{{pageCur*limit + 1}}-{{nextTotal}}</span> 
                OF
                <span>{{totalProducts}}</span>
            </div>
            <ul class="pagi-list">
                <li class="pagi-item">
                    <button class="pagi-btn" :class='{disabled: pageCur === 0}' @click='pageCur--'>Previous</button>
                </li>
                <li class="pagi-item" v-for="index,item in paginationCount" :class='{active:pageCur + 1 === index }' @click='changePagination(index)'>
                    <button class="pagi-btn">{{index}}</button>
                </li>
                <li class="pagi-item">
                    <button class="pagi-btn" :class='{disabled: pageCur === paginationCount-1}' @click='pageCur++'>Next</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang='scss' scoped>
@use "../../scss/" as *;
tbody {
    td:nth-child(2) {
        div {
            @include flex(center, initial);
        }
    }

    td:nth-child(9) span {
        cursor: pointer;
    }
}

.product {
    &__name {
        max-width: 250px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__category {
        text-transform: capitalize;
    }

    &__status {
        padding: 6px 12px;
        border-radius: 12px;
        font-size: 10px !important;
        background-color: rgb(3, 84, 63);
        color: rgba($color: #fff, $alpha: 0.8);

        &-soldout {
            background-color: #9b1c1c;
        }
    }

    &__actions {
        text-align: center;
        cursor: pointer;
        & > i ~ i {
            margin-left: 12px;

        }
    }
}

.pagi {
    @include flex(center, space-between);
    padding: 12px 16px;
    font-size: 12px;

    &-list {
        @include flex(center, space-between);
    }

    &-item {
        padding: 4px 12px;

        &.active {
            background-color: #0e9f6e;
            border-radius: 6px;
        }
    }
    button {
        background-color: transparent;
    }

    button.disabled {
        pointer-events: none;
        color: rgba($color: #fff, $alpha: 0.2);
    }
}

.db__content-search {
    width: 340px;
}
</style>
