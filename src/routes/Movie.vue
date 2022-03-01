<template>
  <div class="container">
    <!-- 로딩 되고있을때 -->
    <template v-if="loading">
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
      <!-- 로딩애니메이션 -->
      <!-- props에 값 전달 -->
      <Loader
        :size="3"
        :fixed="true"
        :z-index="9" />
    </template>


    <!-- 로딩이 끝난후 영화 출력 -->
    <div
      v-else
      class="movie-details">
      <div
        :style="{backgroundImage:`url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <!-- 로딩애니메이션 -->
        <Loader
          v-if="imageLoading"
          :absolute="true" />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }} 
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{Source: name, Value: score} in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader.vue'

export default {
  components:{
    Loader
  },
  data(){
    return{
      imageLoading: true
    }
  },
  computed:{
    theMovie(){
      //store -> state데이터 -> movie모듈 -> theMovie 값
      return this.$store.state.movie.theMovie
    },
    loading(){
      //store -> state데이터 -> movie모듈 -> loading 값
      return this.$store.state.movie.loading
    }
  },
  created(){
    // vue store의 searchMovieWithId 실행
    this.$store.dispatch('movie/searchMovieWithId',{
      // router -> 파라매터 값 id 받아오기
      id: this.$route.params.id
    })
  },
  methods:{
    // 이미지 SX300부분을 다른 사이즈로 변경하는 메서드
    requestDiffSizeImage(url, size = 700){
      if (!url || url === 'N/A') {
        this.imageLoading = false
        return ''
      } else{
        const src = url.replace('SX300', `SX${size}`)
        this.$loadImage(src)
          .then(()=>{
            this.imageLoading = false
          })
        return src
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';

.container{
  padding-top: 40px;

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

  .movie-details{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    color: $gray-600;

    .poster{
      position: relative;
      flex-shrink: 0;
      margin-right: 70px;
      width: 500px;
      height: 500px * 3 / 2;
      border-radius: 10px;
      background-color: $gray-200;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .specs{
      flex-grow: 1;

      .title{
        margin-bottom: 30px;
        color: $black;
        font-family: 'Oswald', sans-serif;
        font-size: 70px;
        line-height: 1;
      }

      .labels{
        color: $primary;

        span{
          &::after{
            // 점(.) 표시 => css 특수문자이다
            content: "\00b7";
            margin: 0 6px;
          }

          &:last-child::after{
            display: none;
          }
        }
      }
      
      .plot{
        margin-top: 20px;
        width: 600px;
      }
      
      .ratings{
        .rating-wrap{
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .rating{
            margin-right: 32px;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
              flex-shrink: 0;
              margin-right: 6px;
              height: 30px;
            }
          }
        }
      }
      
      
      h3{
        margin: 24px 0 6px 0;
        color: $black;
        font-family: "Oswald", sans-serif;
        font-size: 20px;
      }
    }
  }

}

</style>