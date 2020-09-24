import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// 引入路由
import router from './router/index';
// 引入store
import store from './store/index';

const app = createApp(App);

// 挂载路由
app.use(router);
// 挂载store
app.use(store);

app.mount('#app');
