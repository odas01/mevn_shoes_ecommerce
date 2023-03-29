<script>
import { Drawer } from "ant-design-vue";
import CategoryService from "@/services/category.service";
import menImage from "@/assets/image/category/men.png";
import womenImage from "@/assets/image/category/women.png";
import kidImage from "@/assets/image/category/kid.png";
export default {
  components: {
    Drawer,
  },
  data() {
    return {
      categorys: [],
      categoryEdit: {},
      visible: false,
      isSearch: false,
      isFilter: false,
      isUpload: true,
      idEdit: "",
      types: [],
    };
  },
  mounted() {
    this.refreshList();
  },
  methods: {
    setFilter(e) {
      const value = e.target.value;
      this.isFilter = !!value;
      if (value) {
        this.filterCategorys(value);
      } else {
        this.refreshList();
      }
    },
    async seacrhCategorys(e) {
      const value = e.target.value.trim();
      this.isSearch = !!value;
      if (value) {
        try {
          this.categorys = await CategoryService.search(value);
          this.categorys.forEach((category) => {
            category.thumbnail = "data:image/png;base64," + category.thumbnail;
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.refreshList();
      }
    },
    handleCheckbox(e) {
      if (e.target.checked && !this.types.includes(e.target.value))
        this.types.push(e.target.value);
      else this.types.splice(this.types.indexOf(e.target.value), 1);
    },
    showDrawer() {
      this.visible = true;
      if (this.$refs.thumbnail) this.$refs.thumbnail.value = "";
      if (this.isUpload) this.categoryEdit = {};
    },
    closeDrawer() {
      this.visible = false;
      this.isUpload = true;
      this.categoryEdit = {};
      this.$refs.types
        .querySelectorAll("input")
        .forEach((input) => (input.checked = false));
    },
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
    showEidit(category) {
      this.categoryEdit = category;
      this.idEdit = category._id;
      this.isUpload = false;
      this.showDrawer();
    },
    refreshList() {
      this.getCategorys();
    },
    getThumbnailsType(type) {
      switch (type) {
        case "men":
          return menImage;
        case "women":
          return womenImage;
        default:
          return kidImage;
      }
    },
    changeStatus(category) {
      category.open = !category.open;
      this.editCategory(category._id, { open: category.open });
    },
    async getCategorys() {
      try {
        this.categorys = await CategoryService.getAll();
        this.categorys.forEach((category) => {
          category.thumbnail = "data:image/png;base64," + category.thumbnail;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async submitForm(e) {
      e.preventDefault();
      const formData = new FormData(this.$refs.form);
      const newFormData = Object.fromEntries(formData);

      //convert form
      const base64 = await this.convertBase64(newFormData.thumbnail);
      newFormData.thumbnail = base64.slice(base64.indexOf(",") + 1);
      newFormData.types = this.types;

      //action
      this.isUpload
        ? this.upLoadCategory(newFormData)
        : this.editCategory(this.idEdit, newFormData);

      //reset form
      this.categoryEdit = {};
      this.$refs.thumbnail.value = "";
      this.$refs.types
        .querySelectorAll("input")
        .forEach((input) => (input.checked = false));
    },
    async upLoadCategory(data) {
      try {
        data.open = true;
        await CategoryService.create(data);
        this.refreshList();
      } catch (error) {
        console.log(error);
      }
    },
    async editCategory(id, data) {
      try {
        await CategoryService.update(id, data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategory(id, event) {
      if (confirm("Bạn muốn xóa Liên hệ này?")) {
        try {
          await CategoryService.delete(id);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async filterCategorys(value) {
      try {
        this.categorys = await CategoryService.filter(value);
        this.categorys.forEach((category) => {
          category.thumbnail = "data:image/png;base64," + category.thumbnail;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <h3 class="db__title">Categorys</h3>
  <div class="db__content-header">
    <input
      class="db__content-search"
      type="text"
      :disabled="isFilter"
      placeholder="Search by category name"
      @keyup.enter="seacrhCategorys"
    />
    <select
      name="type"
      id=""
      @change="setFilter($event, 'category')"
      :disabled="isSearch"
    >
      <option value="">---Type---</option>
      <option value="men">Men</option>
      <option value="women">Women</option>
      <option value="kid">Kid</option>
    </select>
    <button @click="showDrawer">+ Add category</button>
    <Drawer
      title="Thêm danh mục"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="closeDrawer"
      width="50%"
    >
      <form method="post" class="db__add" @submit="submitForm" ref="form">
        <div>
          <label for="name">Name</label>
          <input type="text" name="name" v-model="categoryEdit.name" />
        </div>
        <div>
          <label for="vnname">VN name</label>
          <input type="text" name="vnname" v-model="categoryEdit.vnname" />
        </div>
        <div>
          <label for="thumbnail">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            ref="thumbnail"
          />
        </div>
        <div class="checkbox d-flex align-items-center mb-4" ref="types">
          <label for="type">Type</label>
          <div class="d-flex">
            <div class="d-flex align-items-center me-5">
              <span>Men</span>
              <input
                type="checkbox"
                value="men"
                name="parent"
                @click="handleCheckbox"
              />
            </div>
            <div class="d-flex align-items-center me-5">
              <span>Women</span>
              <input
                type="checkbox"
                value="women"
                name="parent"
                @click="handleCheckbox"
              />
            </div>
            <div class="d-flex align-items-center me-5">
              <span>Kid</span>
              <input
                type="checkbox"
                value="kid"
                name="parent"
                @click="handleCheckbox"
              />
            </div>
          </div>
        </div>
        <div class="db__add-btn">
          <button type="submit">Add</button>
        </div>
      </form>
    </Drawer>
  </div>
  <div class="db__body" v-if="categorys.length > 0">
    <table>
      <thead>
        <tr>
          <td width="4%"></td>
          <td width="8%">Icon</td>
          <td width="15%">Name</td>
          <td width="15%">VN Name</td>
          <td class="text-center" width="38%">Type</td>
          <td class="text-center" width="10%">PUBLISHED</td>
          <td width="10%"></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categorys">
          <td class="text-center">
            <span>{{ index + 1 }}</span>
          </td>
          <td class="">
            <img :src="category.thumbnail" alt="" ref="thumbnail" />
          </td>
          <td class="">
            <span>{{ category.name }}</span>
          </td>
          <td class="">
            <span>{{ category.vnname }}</span>
          </td>
          <td class="d-flex justify-content-center">
            <span>
              <img
                v-for="item in category.types"
                :src="getThumbnailsType(item)"
                alt=""
                class="me-3"
              />
            </span>
          </td>
          <td class="text-center">
            <span class="px-1 py-1" @click="changeStatus(category)">
              <svg
                v-if="category.open"
                stroke="currentColor"
                style="color: #0e9f6e"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                class="text-green-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                ></path>
              </svg>

              <svg
                v-else
                stroke="currentColor"
                fill="currentColor"
                style="color: #e74c3c"
                stroke-width="0"
                viewBox="0 0 16 16"
                class="text-orange-500"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"
                ></path>
              </svg>
            </span>
          </td>
          <td class="">
            <div>
              <i
                class="fa-solid fa-pen-to-square"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Chỉnh sửa"
                @click="showEidit(category)"
              >
              </i>
              <i
                class="fa-regular fa-trash-can ms-3"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Xóa"
                @click="deleteCategory(category._id, $event)"
              >
              </i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.db__content-search {
  flex: 1;
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
