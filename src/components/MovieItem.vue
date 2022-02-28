<template>
  <!-- style바인딩을 통해 배경으로 포스터 출력 -->
  <div
    class="movie"
    :style="{backgroundImage:`url(${movie.Poster})`}">
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
  </div>
</template>

<script>
export default {
  props: {
    movie:{
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main.scss';

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