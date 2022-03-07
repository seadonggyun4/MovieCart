<template>
  <h1>Parent</h1>
  <Child msg="donggyun" />
</template>

<script>
import Child from './Child.vue'

export default {
  components:{
    Child
  }
}
</script>