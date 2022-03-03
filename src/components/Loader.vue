<template>
  <!-- 로딩애니메이션 -->
  <!-- props 로 사용할 부분에서 값을 받아와 크기 및 위치 등을 조정할수 있다 -->
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex: zIndex
    }"
    :class="{absolute: absolute, fixed: fixed}"
    class="spinner-border text-primary"></div>
</template>


<script>
export default {
  props:{
    size:{
      type: Number,
      default: 2
    },
    absolute:{
      type: Boolean,
      default: false
    },
    fixed:{
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>


<style lang="scss" scoped>
.spinner-border{
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  &.absolute {
    position: absolute;
  }

  &.fixed {
    position: fixed;
  }

  &.text-primary{
  color: $primary !important; 
  }

}
</style>