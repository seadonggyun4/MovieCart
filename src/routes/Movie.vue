<template>
  <h1>Movie</h1>
</template>

<script>
export default {
  created(){
    // vue store의 searchMovieWithId 실행
    this.$store.dispatch('movie/searchMovieWithId',{
      // router -> 파라매터 값 id 받아오기
      id: this.$route.params.id
    })
  }
}
</script>