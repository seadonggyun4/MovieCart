import { createRouter, createWebHashHistory } from "vue-router";
import Home from './Home.vue'
import About from './About.vue'
import Movie from './Movie.vue'

export default createRouter({
  // Hash or History -> 모드선택
  // Hash 모드 -> # 선택, 페이지에서 새로고침시 특정페이지 찾을수 없다는 오류 방지
  history: createWebHashHistory(),
  //페이지
  routes: [
    {
      //예시: https://google.com/
      // 구분기호
      path: '/',
      // 구분을 통해 어느 컴포넌트로 이동할지
      component: Home
    },{
      path: '/about',
      component: About
    },{
      path: '/movie',
      component: Movie
    }
  ]
})