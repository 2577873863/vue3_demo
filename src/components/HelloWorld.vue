<template>
 <div>
   <router-link to="/list">跳转到todoList</router-link>
   <h1>{{text}}</h1>
 </div>
</template>

<script lang="ts">
export default {
  name: 'HelloWorld',
  data() {
    return {
      text:'This is Index Component'
    }
  }
}
</script>
<style scope>
h1{
  color:red;
}
</style>
