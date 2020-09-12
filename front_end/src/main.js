import Vue from 'vue'
import App from './App.vue'
import store from './store/index'  // 全局注入store，所有子组件都可以获取store的内容
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
