<template>
  <div class="container">
    <div class="inner">
      <!-- 영화정보들 에서 영화정보 추출 -->
      <!-- key값은 imdbID -->
      <MovieItem
        v-for="movie in movies"
        :key="movie.imdbID" />
    </div>
  </div>
</template>

<script>
import MovieItem from '~/MovieItem.vue'

export default {
  components:{
    MovieItem
  },
  data(){
    return{
      //검색한 영화 정보들
      movies: []
    }
  }
}
</script>