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

    const doAdd = () => {
      if (state.message == "") return;

      state.list.push({
        id: state.list.length + 1,
        isDone: false,
        message: state.message,
      });

      state.message = "";
    };

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