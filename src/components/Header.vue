<template>
  <header>
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
export default {
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
          href:'/movie'
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