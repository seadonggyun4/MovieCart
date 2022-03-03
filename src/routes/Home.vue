<template>
  <!-- 헤드라인 -->
  <Headlin />
  <!-- search bar -->
  <Search />
  <!-- MovieList -->
  <MovieList />
</template>

<script>
import Headlin from '~/components/Headline.vue'
import Search from '~/components/Search.vue'
import MovieList from '~/components/MovieList.vue'


export default {
  components:{
    Headlin,
    Search,
    MovieList
  },
  created(){
    //store -> mutations -> movie -> resetMovies 
    this.$store.commit('movie/resetMovies')
  }
}
</script>