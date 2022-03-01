<template>
  <div class="container">
    <div class="skeletons">
      <!-- 포스터 스켈레톤 -->
      <div class="skeleton poster"></div>
      <!-- 스펙 스켈레톤 -->
      <div class="specs">
        <div class="skeleton title"></div>
        <div class="skeleton spec"></div>
        <div class="skeleton plot"></div>
        <div class="skeleton etc"></div>
        <div class="skeleton etc"></div>
        <div class="skeleton etc"></div>
      </div>
    </div>
  </div>
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

<style lang="scss" scoped>
@import '~/scss/main';

.container{
  padding-top: 40px;
}

.skeletons {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .skeleton{
    border-radius: 10px;
    background-color: $gray-200;
  }

  .poster{
    flex-shrink: 0;
    margin-right: 70px;
    width: 500px;
    height: 500px * 3 / 2;
  }

  .specs{
    flex-grow: 1;

    .title{
      width: 80%;
      height: 70px;
    }

    .spec{
      margin-top: 20px;
      width: 60%;
      height: 30px;
    }

    .plot{
      margin-top: 20px;
      width: 100%;
      height: 250px;
    }

    .etc{
      margin-top: 20px;
      width: 50%;
      height: 50px;
    }
  }
}
</style>