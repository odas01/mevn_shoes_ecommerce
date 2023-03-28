
<script>
export default {
    props: {
        page: { type: Number },
        last_page: { type: Number },
    },
    methods: {
        setPathSides(type) {
            const to = {
                name: this.$route.name,
                params: {
                    type: this.$route.params.type,
                    category: this.$route.params.category || "all",
                },
                query: {},
            };
            if (!type) {
                if (+this.page !== 2) {
                    to.query = { page: +this.page - 1 };
                }
            } else {
                to.query = {
                    page:
                        this.page === this.last_page
                            ? this.last_page
                            : +this.page + 1,
                };
            }
            return to;
        },
        setPath(page) {
            return {
                name: this.$route.name,
                params: {
                    type: this.$route.params.type,
                    category: this.$route.params.category || "all",
                },
                query: page ? { page } : {},
            };
        },
        filterPagination(page) {
            if (page === 1 || page === this.last_page) return false;
            return Math.abs(page - +this.page) <= 2;
        },
    },
};
</script>
<template>
    <nav
        aria-label="Page navigation example"
        v-if="last_page > 1 && page <= last_page"
    >
        <ul class="pagination">
            <li class="page-item">
                <router-link
                    class="page-link"
                    :to="setPathSides(0)"
                    :class="{ disabled: +page === 1 }"
                >
                    Previous
                </router-link>
            </li>
            <li class="page-item">
                <span class="page-link active" v-if="+page === 1">1</span>
                <router-link
                    v-else
                    class="page-link"
                    aria-current="page"
                    :to="setPath()"
                    >1
                </router-link>
            </li>
            <li class="page-item">
                <span class="page-link" v-if="+this.page > 4">...</span>
            </li>

            <li class="page-item" v-for="pageItem in last_page">
                <span
                    class="page-link active"
                    v-if="+page === pageItem && +page > 1 && +page < last_page"
                    >{{ pageItem }}</span
                >
                <router-link
                    v-else-if="filterPagination(pageItem)"
                    class="page-link"
                    aria-current="page"
                    :to="setPath(pageItem)"
                >
                    {{ pageItem }}
                </router-link>
            </li>

            <li class="page-item" v-if="+page < last_page - 3">
                <span class="page-link">...</span>
            </li>
            <li class="page-item">
                <span class="page-link active" v-if="+page === last_page">{{
                    last_page
                }}</span>
                <router-link
                    v-else
                    class="page-link"
                    aria-current="page"
                    :to="setPath(last_page)"
                >
                    {{ last_page }}
                </router-link>
            </li>
            <li class="page-item">
                <router-link
                    class="page-link"
                    :to="setPathSides(1)"
                    :class="{ disabled: +page === last_page }"
                >
                    Next
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
@use '../scss' as *;
.pagination{
    @include mobile{
        margin: 12px 0;
    }
}

</style>