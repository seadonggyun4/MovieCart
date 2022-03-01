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
        <!-- :class="{active: isMatch(nav.path)}" 은 isMatch 매서드를 통해 반환받은 값에 따라 active 클래스를 활성화 한다. -->
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{active: isMatch(nav.path)}"
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
          href:'/movie/tt4520988',
          path: /^\/movie/ // '/movie' 시작하는 경로가 movie 인지확인.
        },
        {
          name:'About',
          href:'/about'
        },
      ]
    }
  },
  methods: {
    isMatch(path){
      if(!path){
        return false
      } else{
        // path와 this.$route.fullPath 가 일치하는지 test한다.
        // 결과값은 boolean 데이터로 반환
        return path.test(this.$route.fullPath) 
      }
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