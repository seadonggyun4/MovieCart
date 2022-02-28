<template>
  <header>
    <!-- LoGo 컴포넌트 -->
    <Logo />
    <div class="nav nav-pills">
      <!-- for반복문으로 navigations name 출력 -->
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <!-- 라우터 링크 to문법으로 각 컴포넌트 주소 연결 -->
        <!-- active-class 는 active 되었을때 클래스명을 지정 -->
        <RouterLink
          :to="nav.href"
          active-class="active"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components:{
    Logo
  },
  data(){
    return{
      //네비게이션 링크 데이터
      navigations: [
        {
          name:'Search',
          href:'/'
        },
        {
          name:'Movie',
          href:'/movie/tt4520988'
        },
        {
          name:'About',
          href:'/about'
        },
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
header{
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 40px;

  .logo{
    margin-right: 40px;
  }
}
</style>