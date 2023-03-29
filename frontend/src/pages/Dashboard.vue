<script>
import UserService from "@/services/user.service";
import { Drawer } from "ant-design-vue";
export default {
  components: {
    Drawer,
  },
  data() {
    return {
      visible: false,
    };
  },
  async beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token_user");
    if (token) {
      const isAdmin = await UserService.checkAdmin(token);
      if (isAdmin.role === "admin") next();
      else {
        localStorage.setItem(
          "redirect_login",
          JSON.stringify({
            name: to.name,
            params: to.params,
            query: to.query,
          })
        );
        location.replace("/auth/login");
      }
    } else {
      localStorage.setItem(
        "redirect_login",
        JSON.stringify({
          name: to.name,
          params: to.params,
          query: to.query,
        })
      );
      location.replace("/auth/login");
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      location.reload();
    },
  },
};
</script>

<template>
  <div class="db d-flex">
    <ul class="db__sider">
      <a href="/" class="db__sider-logo px-4">
        <img src="../assets/image/db_logo.png" alt="" />
      </a>
      <ul class="mt-3">
        <!-- <li>
                    <router-link :to='{name: "dashboard.home"}'>
                        <i class="fa-solid fa-house"></i>
                        <span class="ms-3">
                            Dashboard
                        </span>
                    </router-link>
                </li> -->
        <li>
          <router-link :to="{ name: 'dashboard.products' }">
            <i class="fa-solid fa-basket-shopping"></i>
            <span class="ms-3"> Products </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'dashboard.categorys' }">
            <i class="fa-solid fa-list"></i>
            <span class="ms-3"> Categorys </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'dashboard.customers' }">
            <i class="fa-solid fa-users"></i>
            <span class="ms-3"> Customers </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'dashboard.orders' }">
            <i class="fa-solid fa-check"></i>
            <span class="ms-3"> Orders </span>
          </router-link>
        </li>
      </ul>
      <div class="db__sider-logout d-flex justify-content-center pb-4">
        <button @click="logout">
          <i class="fa-solid fa-right-from-bracket mx-2"></i>
          Log out
        </button>
      </div>
    </ul>
    <div class="db__layout">
      <div class="db__header px-3">
        <div class="db__header-dropdown">
          <i class="fa-solid fa-bars" @click="visible = !visible"></i>
          <Drawer
            placement="left"
            :closable="false"
            :visible="visible"
            @close="visible = false"
            class="db__header-drawer"
            width="60%"
          >
            <ul class="mt-3">
              <!-- <li>
                                <router-link :to='{name: "dashboard.home"}'>
                                    <i class="fa-solid fa-house"></i>
                                    <span class="ms-3">
                                        Dashboard
                                    </span>
                                </router-link>
                            </li> -->
              <li>
                <router-link :to="{ name: 'dashboard.products' }">
                  <i class="fa-solid fa-basket-shopping"></i>
                  <span class="ms-3"> Products </span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'dashboard.categorys' }">
                  <i class="fa-solid fa-list"></i>
                  <span class="ms-3"> Categorys </span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'dashboard.customers' }">
                  <i class="fa-solid fa-users"></i>
                  <span class="ms-3"> Customers </span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'dashboard.orders' }">
                  <i class="fa-solid fa-check"></i>
                  <span class="ms-3"> Orders </span>
                </router-link>
              </li>
            </ul>
            <div class="db__sider-logout d-flex justify-content-center pb-4">
              <button @click="logout">
                <i class="fa-solid fa-right-from-bracket mx-2"></i>
                Log out
              </button>
            </div>
          </Drawer>
        </div>
        <div class="db__header-user">
          <img src="../assets/image/user.png" alt="" />
        </div>
      </div>
      <div class="db__content ps-4 pe-5 py-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../scss/" as *;
.db {
  height: 100vh;
  overflow: hidden;
  font-size: 14px;

  @include mobile {
    overflow: unset;
  }

  &__sider {
    display: flex;
    flex-direction: column;
    width: 260px;
    background-color: $gray-color;

    &-logo {
      height: 100px;
    }

    ul {
      span {
        font-size: 16px;
      }
    }

    a {
      @include flex(center);
      padding: 16px 24px;
      position: relative;
      color: $gray-light-color;
      font-weight: 600;

      i {
        width: 16px;
      }

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: #0e9f6e;
        clip-path: polygon(0 0, 100% 5%, 100% 95%, 0% 100%);
        display: none;
      }

      &.router-link-exact-active::before {
        display: block;
      }

      &.router-link-exact-active {
        color: rgba($color: $white-color, $alpha: 0.8);
      }

      &:hover {
        color: rgba($color: $white-color, $alpha: 0.8) !important;
      }
    }

    &-logout {
      margin-top: auto;

      button {
        width: 208px;
        height: 46px;
        border-radius: 8px;
        color: rgba($color: $white-color, $alpha: 0.8);
        background-color: #0e9f6e;
        transition: all 0.2s ease;

        &:hover {
          background-color: $green-btn-color;
        }
      }
    }

    @include mobile {
      display: none;
    }
  }

  &__layout {
    display: flex;
    flex-direction: column;
    flex: 1;

    @include mobile {
      width: 100%;
    }
  }

  &__header {
    height: 64px;
    background-color: $gray-color;
    @include flex(center, flex-end);

    &-user {
      width: 32px;
      height: 32px;
      border-radius: 100rem;
    }

    &-dropdown {
      display: none;
      padding-left: 12px;

      i {
        color: $white-color;
        font-size: 18px;
      }
    }

    &-drawer {
      width: 60%;
      margin-top: 64px;

      .ant-drawer-body {
        padding: 0;
        position: relative;

        button {
          width: 80%;
          margin-left: 0;
          margin-top: 40px;
        }
      }

      a {
        @include flex(center);
        padding: 16px 24px;
        position: relative;
        color: $gray-light-color;
        font-weight: 600;

        i {
          width: 16px;
        }

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background-color: #0e9f6e;
          clip-path: polygon(0 0, 100% 5%, 100% 95%, 0% 100%);
          display: none;
        }

        &.router-link-exact-active::before {
          display: block;
        }

        &.router-link-exact-active {
          color: rgba($color: $white-color, $alpha: 0.8);
        }

        &:hover {
          color: rgba($color: $white-color, $alpha: 0.8) !important;
        }
      }
    }

    @include mobile {
      justify-content: space-between;

      &-dropdown {
        display: block;
      }
    }
  }

  &__content {
    height: 1000px;
    overflow-y: overlay;
    flex: 1;
    background-color: #121317;
    color: rgba($color: $white-color, $alpha: 0.8);

    &-header {
      background-color: $gray-color;
      padding: 16px;
      @include flex(center, space-between);

      select {
        flex: 1;
        text-transform: capitalize;

        @include mobile {
          flex: unset;
        }
      }

      button {
        width: 208px;
        height: 46px;
      }

      * ~ * {
        margin-left: 20px;

        @include mobile {
          margin-left: 0;
          margin-top: 12px;
        }
      }

      @include mobile {
        flex-wrap: wrap;

        & > * {
          width: 100% !important;
        }
      }
    }

    &-search {
      &::placeholder {
        color: #87adc6;
      }
    }

    .ant-drawer-content-wrapper {
      width: 50% !important;

      @include mobile {
        width: 100% !important;
      }
    }

    .ant-drawer-close {
      color: $white-color;
    }
  }

  &__title {
    color: $text-color;
  }

  &__body {
    margin-top: 24px;
    width: 100%;
    background-color: $gray-color;
    border-radius: 6px;
    overflow: hidden;

    table {
      width: 100%;

      @include mobile {
        width: 1124px;
      }
    }

    thead {
      td {
        padding: 16px;
        font-size: 11px;
        text-transform: uppercase;
      }
    }

    tbody {
      td:not(:first-child) {
        color: $gray-light-color;
        padding: 16px;

        img {
          width: 32px;
          height: 32px;
          border-radius: 100rem;
        }

        span {
          font-size: 13px;
        }
      }

      td:first-child {
        span {
          font-size: 12px;
        }
      }
    }

    tr {
      border: 1px solid rgba($color: $white-color, $alpha: 0.05);
    }

    @include mobile {
      overflow: unset;
      overflow-y: auto;
    }
  }

  &__add {
    & > div {
      @include flex(center);
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    label {
      color: $gray-light-color;
      width: 30%;
      font-size: 16px;

      + * {
        width: 70%;
      }
    }

    &-btn {
      display: flex;
      justify-self: center;
      width: 100%;
      height: 48px;

      button {
        height: 100%;
      }
    }

    span {
      margin-top: 4px;
      margin-left: 30%;
      color: #bdc3c7;
    }
  }
}

input:not([type="file"]),
select,
textarea {
  height: 48px;
  border: 1px solid rgb(76, 79, 82);
  background-color: rgb(36, 38, 45);
  color: $text-color;
  border-radius: 8px;
  outline: none;
  padding-left: 12px;
}

input[type="file" i] {
  color: $text-color;
}

textarea {
  height: unset;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

button {
  font-size: 14px;
  border-radius: 8px;
  color: $white-color;
  background-color: $green-btn-color;
  border: none;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: $green-btn-color;
  }
}

.ant-drawer {
  &-header {
    background-color: $gray-color;
    border-radius: 0;
    border-bottom: none;
  }

  &-title {
    color: $text-color;
    text-transform: uppercase;
    font-size: 17px;
    text-align: center;
  }

  &-body {
    background-color: $gray-color;
    padding: 24px;

    button {
      margin-left: 30%;
      width: 50%;
    }
  }

  &-content-wrapper {
    width: 50% !important;
  }
}
</style>
