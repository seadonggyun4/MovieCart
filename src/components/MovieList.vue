<template>
  <div class="container">
    <!-- movies.length가 없는 경우에만 no-result 클래스 추가 -->
    <!-- !movies.length 는 movies.length 가 비어있으면 true 반환 => no-result가 추가된다. -->
    <div
      :class="{'no-result': !movies.length}"
      class="inner">
      <!-- 로딩애니메이션 -->
      <Loader v-if="loading" />
      <!-- 에러메시지 여부에 따라 메시지가 있으면 출력 -->
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <!-- 에러메시지가 없으면 출력 -->
      <!-- 영화정보들 에서 영화정보 추출 -->
      <!-- key값은 imdbID -->
      <!-- props 로 MovieItem에 movie 값을 넘긴다. -->
      <div
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MovieItem from '~/components/MovieItem.vue'
import Loader from '~/components/Loader.vue'

export default {
  components:{
    MovieItem,
    Loader
  },
  computed:{
    // stroe 의 state(데이터) -> movie모듈 -> 데이터(movies, message, loading)
    ...mapState('movie',[
      'movies',
      'message',
      'loading'
    ])
  }
}
</script>


<style lang="scss" scoped>

.container{
  margin:30px auto;

  .inner{
    padding: 10px 0;
    text-align: center;
    background-color: $gray-200;
    border-radius: 4px;

    // movies.length가 없는 경우에만 no-result 클래스 추가
    &.no-result{
      padding: 70px 0;
    }
  }

  .message{
    color: $gray-400;
    font-size: 20px;
  }

  .movies{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
</style>