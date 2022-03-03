<template>
  <div class="container">
    <h1>
      <span>Movie Cart</span><br />
      THE OPEN<br /> 
      MOVIE DATABASE
    </h1>
    <p>
      Movie Cart는 OMDB API 기반으로 만들어진 영화 검색 사이트 입니다, 여기서 보게 되는 모든 영화관련 데이터는 OMDB 사이트와 유저들로부터 제공받았습니다.<br />
      만약 심심해서 혹은 찾고 싶은 특정 영화가 있다면 Movie Cart 사이트에서 여러분 만의 영화를 찾아보세요!!
    </p>
  </div>
</template>

<style lang="scss" scoped>

.container{
  padding-top: 50px;

  h1{
    line-height: 1;
    font-family: 'Oswald', sans-serif;
    font-size: 80px;

    span{
      color: $primary;
    }
  }

  p{
    margin: 30px 0;
    color: $gray-600;
  }

}

</style>