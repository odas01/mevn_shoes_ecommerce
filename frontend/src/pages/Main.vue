<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
export default {
    components: {
        AppHeader: Header,
        AppFooter: Footer,
        AppNavbar: Navbar,
    },
    watch: {
        $route(to, from) {
            const token = localStorage.getItem("token_user");
            if (
                to.name !== "home" &&
                to.name !== "category.show" &&
                to.name !== "detail" &&
                to.name !== "auth.login" &&
                to.name !== "auth.register"
            ) {
                if (!token) {
                    localStorage.setItem(
                        "redirect_login",
                        JSON.stringify({
                            name: to.name,
                            params: to.params,
                            query: to.query,
                        })
                    );
                    this.$router.push({
                        name: "auth.login",
                    });
                }
            }
        },
    },
    async beforeCreate() {
        const token = localStorage.getItem("token_user");
        if (token) {
            await this.$store.dispatch("getUser", token);
            this.$store.dispatch("cartQuantity");
        }
    },
    async beforeRouteEnter(to, from, next) {
        const token = localStorage.getItem("token_user");
        if (
            to.name !== "home" &&
            to.name !== "category.show" &&
            to.name !== "detail"
        ) {
            if (token) {
                next();
            } else {
                localStorage.setItem(
                    "redirect_login",
                    JSON.stringify({
                        name: to.name,
                        params: to.params,
                        query: to.query,
                    })
                );
                next({
                    name: "auth.login",
                });
            }
        } else next();
    },
};
</script>

<template>
<div id="app">
    <AppHeader />
    <AppNavbar />
    <div class="container">
        <router-view />
    </div>
    <AppFooter />
    </div>
</template>

<style lang="scss" scoped>
@use "../scss/" as *;
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.container{
    margin: 12px auto;
    @include mobile{
        margin: 6px auto;
    }
}
</style>