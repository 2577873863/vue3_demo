import { createRouter, createWebHashHistory } from 'vue-router';
import List from '../view/list.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  {
    path:'/',
    name:'index',
    component: HelloWorld
  },
  {
    path:'/list',
    name:'list',
    component: List
  }
]

const router =  createRouter({

  //指定路由的模式，此处使用的是hash模式
  history: createWebHashHistory(),

  // 路由地址
  routes
})

export default router;