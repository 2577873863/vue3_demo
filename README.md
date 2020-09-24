## 1.熟悉和搭建环境
#### 基本步骤

1. 使用`vite`初始化`Vue3`项目
2. 配置`Typescript`
3. 使用`vue-router`
4. 使用`vuex`
5. 开发demo

#### 1.使用`vite`初始化项目

`vite` 是一个基于 `Vue3` 单文件组件的非打包开发服务器，是尤大新开发的一个工具，用尤大的话说：`Vite `是一个由原生 `ES Module `驱动的 `Web` 开发构建工具。在开发环境下基于浏览器原生 `ES imports` 开发，在生产环境下基于`Rollup`打包。

```javascript
//ES Module和commonJS基本使用区别

//ES Module 导入
import xxx from 'xxx';
//commonJS 导入
const xxx = require('xxxx');

//ES Module 导出
export const counter = {
    a: 12
}
//commonJS 导出
module.exports = {
	a: 12    
}
```

__`vite`的优势__

_`webpack`启动项目可能要几十秒甚至超过一分钟_

	* 开发服务器启动后不需要进行打包操作，启动会变得非常迅速
	* 代码在需要的时候进行编译，所以只有代码真正在屏幕上展现的时候才进行编译。开始开发的时候再也不需要等待整个应用编译完成，这对大型应用是一个巨大的改变
* 热模块替换的性能和模块的数量之间的关系解耦，热模块替换变得非常快

##### 初始化`vite`项目

1. 执行`yarn create vite-app demo01`

2. cd到项目目录执行`yarn`安装依赖

3. 使用`yarn dev`启动项目

4. 通过`localhost:3000`查看项目

   ![](https://pic.imgdb.cn/item/5f689622160a154a679c452e.jpg)

##### 项目目录

![](https://pic.imgdb.cn/item/5f689696160a154a679cb056.jpg)

#### 2.配置`Typescript`

1. 安装`Typescript`运行`yarn add typescript`

2. 生成`tsconfig.json`配置文件 执行`tsc --init`

3. 修改`main.js`文件为`main.ts`，将`index.html`中`main.js`的引用也修改为`main.ts`，将`app.vue`和`HelloWorld.vue`的`script`标签加上`lang="ts"`属性，例如：
	
```html
	<script lang="ts">
	  //code... 
	</script>
```

4. 在根目录下创建`declarations.d`文件，并写入如下内容：

   ```javascript
   //不这么处理的话，在main.ts中引入app.vue会报错，因为ts不识别.vue文件
   declare module"*.vue" {
     import { Component } from"vue";
     const component: Component;
     export default component;
   }
   ```
   
#### 3.使用`vue-router`

1. 安装`vue-router`，运行`yarn add vue-router@4.0.0-beta11 `（最新版本还是beta版本，需要带上版本号）

2. 在`src`下创建`router`文件夹，然后添加`index.ts`文件，在`index.ts`文件中写入一下内容：

   ```javascript
   import { createRouter, createWebHashHistory } from 'vue-router';
   
   export default createRouter({
     //指定路由的模式，此处使用的是hash模式
     history: createWebHashHistory(),
     // 路由地址
     routes: [
      // 这里的配置和之前一样   
     ]
   })
   
   ```

3. 将`vue-router`引入到`main.ts`里面，`main.ts`修改后内容如下：

   ```javascript
   import { createApp } from 'vue'
   import App from './App.vue'
   import './index.css'
   
   const app = createApp(App);
   // 引入路由
   import router from './router/index';
   // 挂载路由
   app.use(router);
   
   app.mount('#app');
   ```

      _剩余的路由配置例如`router-view`、`router-link`都与之前版本相同_
   
#### 4.使用`vuex`

1. 安装`vuex`，运行`yarn add vuex@4.0.0-beta4`（最新版本还是beta版本，需要带上版本号）
2. 在`src`下创建`store`文件夹，然后添加`index.ts`文件，在`index.ts`文件中写入一下内容：

   ```javascript
   import { createStore } from 'vuex'
   
   export default createStore({
     state(): { name: string, age: number } {
       return {
         name: 'vue3',
         age: 11
       }
      }
    })
   ```

3. 将`vuex`引入到`main.ts`里面，`main.ts`最终修改结果如下（包括router）：

   ```javascript
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
   ```
#### 5.开发demo

​	_一个todolist的小demo_

1. 在`src`目录下面新建一个`view`文件夹，然后在其中新建文件`list.vue`，并为文件添加以下内容：

   ```vue
   <template>
     <div>
       <div>
         <label for="add">新增事项：</label>
         <input
           placeholder="回车确定新增"
           type="text"
           id="add"
           v-model="state.message"
           @keyup.enter="doAdd"
         />
       </div>
       <div>
         <h2>待办事项：{{ todoList.length }}</h2>
         <ul>
           <li
             v-for="item in todoList"
             :key="item.id"
             @click="changeItem(item, true)"
           >
             <input type="checkbox" />
             <label for="">{{ item.message }}</label>
           </li>
         </ul>
       </div>
       <div>
         <h2>已完成事项：{{ doneList.length }}</h2>
         <ul>
           <li
             v-for="item in doneList"
             :key="item.id"
             @click="changeItem(item, false)"
           >
             <input type="checkbox" checked />
             <label for="">{{ item.message }}</label>
           </li>
         </ul>
       </div>
     </div>
   </template>
   <script lang="ts">
   // reactive就是vue2.x的data
   // 在 Vue 2x 中数据的响应式处理是基于 Object.defineProperty() 的，
   // 它只会侦听对象的属性，并不能侦听对象，所以我们在给对象加属性的时候通常要用$set
   // 例如：Vue.$set(object, 'key', value)
   // reactive 是基于 ES2015 Proxy 实现对数据对象的响应式处理,可以往对象中添加属性
   // 例如： object.key = value
   type LooseObject = {
     [key: string]: any;
   };
   import { computed, reactive } from "vue";
   import { useRouter } from 'vue-router';
   export default {
     // setup相当于vue2.0的 beforeCreate和 created
     // 是vue3新增的一个属性，所有的操作都在此属性中完成
     setup(props) {
       const state = reactive({
         list: [
           { id: 1, isDone: false, message: "看书" },
           { id: 2, isDone: true, message: "睡觉" },
           { id: 3, isDone: false, message: "恰饭" },
         ],
         message: "",
       });
   
       // 未完成列表
       const todoList = computed(() => {
         return state.list.filter((item) => !item.isDone);
       });
   
       // 已完成列表
       const doneList = computed(() => {
         return state.list.filter((item) => item.isDone);
       });
   
       const changeItem = (item: LooseObject, state: boolean) => {
         item.isDone = state;
       };
   
       // 新增事项   
       const doAdd = () => {
         if (state.message == "") return;
   
         state.list.push({
           id: state.list.length + 1,
           isDone: false,
           message: state.message,
         });
   
         state.message = "";
       };
         
       // 在Vue3.x中，所有的数据和方法都通过在setup中return出去
       // 然后在template中使用
       return {
         state,
         todoList,
         doneList,
         changeItem,
         doAdd
       };
     },
   };
   </script>
   <style scoped>
   ul li {
     list-style: none;
   }
   </style>
   ```

2. 修改`App.vue`内容：

   ```vue
   <template>
     <router-view></router-view>
   </template>
   
   <script lang="ts">
   export default {
     name: 'App'
   }
   </script>
   ```

3. 修改`router/index.ts`文件，调整路由

   ```javascript
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
   ```

__最后就可以打开 `http://localhost:3000/#/list`查看效果了，[示例项目地址]()__

![](https://pic.downk.cc/item/5f6c8e4f160a154a6778d422.jpg)
