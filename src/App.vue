<template>
  <!-- Header 출력 -->
  <Header /> 
  <!-- 전체 영역에서 사용할 수 있는 컴포넌트 -->
  <RouterView />
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components:{
    Header
  }
}
</script>


<style lang="scss">
@import "~/scss/main.scss";
</style>