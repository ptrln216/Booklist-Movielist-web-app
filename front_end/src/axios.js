import axios from 'axios';
import router from './router';

// 创建axios实例
let axiosInstance = axios.create({
    timeout: 5000,  // 请求超过5s返回错误
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});

// request拦截器
axiosInstance.interceptors.request.use(
    config => {
        //判断是否存在token，如果存在的话，则每个http header都加上token
        if (this.$store.state.token) {
            config.headers.Authorization = `token ${this.$store.state.token}`;
        }
        return config;
    }
)

// response拦截器
axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {  // 除了2XX外都是错误，就会走到这
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.replace({  // 跳转到登录页面
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该页面
                    });
            }
        }
        return Promise.reject(error.response);
    }
)

// const url = 'http://localhost:5000/api/';

export default axiosInstance;

// export default {
//     // 暴露四个请求方法，对应四个后台接口

//     // 用户注册
//     userRegister(data) {
//         console.log(data)
//         return axiosInstance.post(`${url}register`, data);
//     },
//     // 用户登录
//     userLogin(data) {
//         return axiosInstance.post(`${url}login`, data);
//     },
//     // 获取用户
//     getUser() {
//         return axiosInstance.get(`${url}users`);
//     },
//     // 删除用户
//     deleteUser(data) {
//         return axiosInstance.delete(`${url}delUser`, data);
//     }
// }