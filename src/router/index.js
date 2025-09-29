import { createRouter, createWebHashHistory } from 'vue-router';
import LoginPage from '../vue/components/LoginPage.vue';
import RegisterPage from '../vue/components/RegisterPage.vue';
import ArticlesList from '../vue/components/ArticlesList.vue';
import ArticleDetail from '../vue/components/ArticleDetail.vue';
import ArticleForm from '../vue/components/ArticleForm.vue';
import api from '../vue/services/api';

// Tableau des routes
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
    },
    {
        path: '/articles',
        name: 'Articles',
        component: ArticlesList,
        meta: { requiresAuth: true },
    },
    {
        path: '/articles/:id',
        name: 'ArticleDetail',
        component: ArticleDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/articles/new',
        name: 'ArticleNew',
        component: ArticleForm,
        meta: { requiresAuth: true },
    },
    {
        path: '/articles/:id/edit',
        name: 'ArticleEdit',
        component: ArticleForm,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// Guard pour vérifier l'authentification
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!api.getToken();

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
        next('/articles');
    } else {
        next();
    }
});

export default router;