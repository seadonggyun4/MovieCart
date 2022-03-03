<template>
  <!-- style바인딩을 통해 배경으로 포스터 출력 -->
  <!-- 각각의 무비 아이템은 RouterLink를 통해 movie.imdbID가 있는 주소로 이동가능 -->
  <RouterLink
    class="movie"
    :style="{backgroundImage:`url(${movie.Poster})`}"
    :to="`/movie/${movie.imdbID}`">
    <!-- 로딩애니메이션 -->
    <Loader
      v-if="imageLoading"
      :size="1.5"
      :absolute="true" />
    <div class="info">
      <!-- 연도 -->
      <div class="year">
        {{ movie.Year }}
      </div>
      <!-- 타이틀 -->
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader.vue'

export default {
  components:{
    Loader
  },
  props: {
    movie:{
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return{
      imageLoading: true
    }
  },
  mounted(){
    //movieItem 이 mounted 되었을때 init()메서드 실행
    this.init()
  },
  methods:{
    //이미지 초기화 메서드 
    // -> img태그 생성 -> img의 src에 포스터 url 연결 -> img 가 load 되면 imgeLoading 값 false로 바꾼다.
    async init(){
      const poster = this.movie.Poster

      if(!poster || poster === 'N/A'){
        this.imageLoading = false
      } else{

        await this.$loadImage(poster)
        this.imageLoading = false
      }

    }
  }
}
</script>

<style lang="scss" scoped>

.movie{
  $width: 200px;

  position: relative;
  margin: 10px;
  width: $width;
  height: $width * 3/2;
  cursor: pointer;
  background-color: $gray-400;
  background-repeat: no-repeat;
  // cover -> width, height 중 더 넓은 요소에 맞춰 출력 되게
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  overflow: hidden;

  &::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0; 
    opacity: 0;
    transition: all .2s ease-in-out;
  }

  .info{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    bottom: 0;
    left: 0;
    padding: 14px;
    height: 150px;
    width: 100%;
    font-size: 14px;
    text-align: center;
    background: linear-gradient(transparent, #000);
    transition: all .2s ease-in-out;
    opacity: 0;

    .year{
      margin-bottom: 10px;
      font-weight: 700;
      color: $primary;
    }

    .title{
      margin-bottom: 10px;
      width: 100%;
      color: $white;
      // white-space 는 공백문자(띄어쓰기, 탭) 처리 속성
      white-space: nowrap;
      // text-overflow: ellipsis -> ... 표시(white-space 와 같이 사용해야 정상작동)
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &:hover{

    .info{
      opacity: 1;
    }

    &::after{
      border: 6px solid $primary;
      opacity: 1;
    }
  }
}
</style>