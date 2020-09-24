import { createStore } from 'vuex'


export default createStore({
  state(): { name: string, age: number } {
    return {
      name: 'vue3',
      age: 11
    }
  }
})