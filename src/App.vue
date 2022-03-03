<template>
  <!-- Header 출력 -->
  <Header /> 
  <!-- 전체 영역에서 사용할 수 있는 컴포넌트 -->
  <!-- vue-router를 사용하면 사용할수 있는 컴포넌트 -->
  <RouterView />
  <!-- Footer 출력 -->
  <Footer />
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components:{
    Header,
    Footer
  }
}
</script>

