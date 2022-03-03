import { createRouter, createWebHashHistory } from "vue-router";
import Home from './Home.vue'
import About from './About.vue'
import Movie from './Movie.vue'
import NotFound from './NotFound.vue'

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
      // id 파라메터 -> id 주소가 입력된다.
      // id 파라메터 와 같은 파라메터 이름은 직관적으로 프로그래머 본인이 설정한다.
      path: '/movie/:id',
      component: Movie
    },{
      // pathMatch 파라메터 -> 정규표현식 (.*)를 검사해 루트경로에 작성하는 모든 문자와 일치시킨다.
      // 정규 표현식을 통해 일치된 모든 주소는 notFound 컴포넌트로 보낸다
      // 결국 / , /about, /movie/:id 를 제외한 모든 주소는 notFound 컴포넌트로 가는 구조이다.
      path: '/:pathMatch(.*)',
      component: NotFound
    }
  ]
})