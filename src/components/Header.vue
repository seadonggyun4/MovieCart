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
    <!-- RouterLink로 이동해도 되지만 click 이벤트 발생시 toAbout 매서드 실행 -->
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
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
  computed:{
    ...mapState('about',[
      'image',
      'name'
    ])
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
    },
    toAbout(){
      this.$router.push('/about')
    }
  }
}
</script>


<style lang="scss" scoped>

header{
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 40px;

  .logo{
    margin-right: 40px;
  }
  .user{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    padding: 6px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $gray-200;
    transition: all .2s ease-in-out;
    cursor: pointer;
    overflow: hidden;

    img{
      width: 100%;
      border-radius: 50%;
    }

    &:hover{
      //darken은 scss 내장함수 -> 더 어둡게 색상을 바꾼다.
      background-color: darken($color: $gray-200, $amount: 10%);
    }
  }

  @include media-breakpoint-down(sm){
    .nav{
      display: none;
    }
  }
}
</style>