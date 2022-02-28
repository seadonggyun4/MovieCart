<template>
  <div class="container">
    <div class="inner">
      <div class="message">
        {{ message }}
      </div>
      <!-- 영화정보들 에서 영화정보 추출 -->
      <!-- key값은 imdbID -->
      <!-- props 로 MovieItem에 movie 값을 넘긴다. -->
      <div class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem.vue'

export default {
  components:{
    MovieItem
  },
  computed:{
    movies(){
      // stroe 의 state(데이터) -> movie모듈 -> movies 의 값
      return this.$store.state.movie.movies
    },
    message(){
      return this.$store.state.movie.message
    }
  }
}
</script>


<style lang="scss" scoped>
.container{
  .movies{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
</style>