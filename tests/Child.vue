<template>
  <div>Child: {{ msg }}</div>
</template>

<script>
export default {
  props:{
    msg:{
      type: String,
      default: ''
    }
  }
}
</script>