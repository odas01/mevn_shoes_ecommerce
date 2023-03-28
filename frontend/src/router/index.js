import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/pages/Main.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/main/Home.vue'),
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: () => import('@/pages/main/Detail.vue'),
            },
            {
                path: '/:type/:category',
                name: 'category.show',
                component: () => import('@/pages/main/Store.vue'),
            },
            {
                path: '/search',
                name: 'search',
                component: () => import('@/pages/main/Search.vue'),
            },
            {
                path: '/cart',
                name: 'cart',
                component: () => import('@/pages/main/Cart.vue'),
            },
            {
                path: '/checkout',
                name: 'checkout',
                component: () => import('@/pages/main/Checkout.vue'),
            },
            {
                path: '/introduce',
                name: 'introduce',
                component: () => import('@/pages/main/Introduce.vue'),
            },
            {
                path: '/contact',
                name: 'contact',
                component: () => import('@/pages/main/Contact.vue'),
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/pages/Dashboard.vue'),
        children: [
            {
                path: '',
                name: 'dashboard.home',
                redirect:'/dashboard/products',
                component: () => import('@/pages/dashboard/Home.vue'),
            },
            {
                path: 'products',
                name: 'dashboard.products',
                component: () => import('@/pages/dashboard/Products.vue'),
            },
            {
                path: 'product/:id',
                name: 'dashboard.productdetail',
                component: () => import('@/pages/dashboard/ProductDetail.vue'),
            },
            {
                path: 'categorys',
                name: 'dashboard.categorys',
                component: () => import('@/pages/dashboard/Categorys.vue'),
            },
            {
                path: 'customers',
                name: 'dashboard.customers',
                component: () => import('@/pages/dashboard/Customers.vue'),
            },
            {
                path: 'orders',
                name: 'dashboard.orders',
                component: () => import('@/pages/dashboard/Orders.vue'),
            },
            {
                path: 'order/:id',
                name: 'dashboard.orderdetail',
                component: () => import('@/pages/dashboard/OrderDetail.vue'),
            },
        ],
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/pages/Auth.vue'),
        beforeEnter(to, from, next) {
            if (!to.name.includes('.')) {
                next({
                    name: 'notfound',
                    params: {
                        pathMatch: to.path.split('/').slice(1),
                    },
                    query: to.query,
                    hash: to.hash,
                });
            }
            next();
        },
        children: [
            {
                path: 'login',
                name: 'auth.login',
                component: () => import('@/pages/auth/Login.vue'),
            },
            {
                path: 'register',
                name: 'auth.register',
                component: () => import('@/pages/auth/Regis.vue'),
            },
            {
                path: 'changePassword',
                name: 'auth.changePassword',
                component: () => import('@/pages/auth/ChangePassword.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/pages/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
