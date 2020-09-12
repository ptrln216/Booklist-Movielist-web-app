import Vue from 'vue';
import Router from 'vue-router';
import BookList from '../views/BookList/BookList.vue';
import MovieList from '../views/MovieList/MovieList.vue';
import Login from '../views/User/Login.vue';
import Register from '../views/User/Register.vue';
import Index from "../views/Index.vue";
import store from '../store';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/register',
            name: 'Register',
            component: Register
        }, {
            path: '/',
            name: 'Index',
            component: Index,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    component: BookList,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/booklist',
                    name: 'BookList',
                    component: BookList,
                    meta: { requiresAuth: true }
                }, {
                    path: '/movielist',
                    name: 'MovieList',
                    component: MovieList,
                    meta: { requiresAuth: true }
                }
            ]
        }
    ]
});

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    // 获取store里面的token
    let token = store.state.User.token;
    // 判断要去的路由有没有导航守卫
    if (to.meta.requiresAuth) {
        if (token) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将刚才的目标路由path作为参数，方便登录后直接跳转到该路由
            })
        }
    } else {
        next();
    }
})

export default router;