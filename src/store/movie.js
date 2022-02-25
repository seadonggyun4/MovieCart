export default{
  //모듈화 가능하다는 의미
  namespaced: true, 
  //data 형식
  state: () => ({
    movies: []
  }), 
  // computed 형식
  // state와 연결되기 위해 내부 함수는 매개변수로 state를 받아야 한다.
  getters: {
    movieIds(state){
      return state.movies.map( m => m.imdbID)
    }
  },
  // methods 형식
  // 데이터 수정은 mutations 에서만 가능
  // 즉 mutations는 데이터 변경만을 위한 매서드, 그외 매서드는 actions에서 처리
  // actions는 기본적으로 비동기로 처리되는 매서드(state를 바로 받아서 처리하지는 못한다.)
  mutations:{
    resetMovies(state){
      state.moives = []
    }
  }, 
  actions:{
    searchMovies(){

    }
  } 
}

