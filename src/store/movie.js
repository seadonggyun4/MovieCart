import axios from 'axios' // http 통신 도와주는 모듈 
import _uniqBy from 'lodash/uniqBy'

export default{
  //모듈화 가능하다는 의미
  namespaced: true, 
  /*
    [ data 형식]
  */
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false
  }), 
  /*
    [computed 형식]
    state와 연결되기 위해 내부 함수는 매개변수로 state를 받아야 한다.
  */
  getters: {},
  
  /* 
    [methods 형식]
    데이터 수정은 mutations 에서만 가능 => 데이터 수정을 위한 메서드
    즉 mutations는 데이터 변경만을 위한 매서드, 그외 매서드는 actions에서 처리
  */
  mutations:{
    //state 의 데이터를 갱신하는 매서드
    updateState(state,payload){
      //새로운 배열데이터 생성
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.moives = []
    }
  }, 
  /*
    [methods 형식]
    actions는 기본적으로 비동기로 처리되는 매서드(state를 바로 받아서 처리하지는 못한다.)
    context는 state, getters, mutations를 활용할수 있는 내용 => context를 구조분해 해서 사용할 요소들만 불러온다. 예: {state,commit}
    payload는 searchMovies를 활용할때 인수로 들어온 특정한 데이터 활용
  */
  actions:{
    async searchMovies({state, commit}, payload){
      // state.loading 이 true일 경우 함수 실행 종료
      // 사용자가 searchMovies 함수가 동작중일때 여러번 실행하는 것을 방지
      if(state.loading){
        return
      }

      // 검색 시작되면 메시지 초기화
      // 에러 메시지가 있다면 movieList 컴포넌트에서 movieitem을 출력 안하기 때문에 초기화
      commit('updateState',{
        message:'',
        loading: true //로딩 시작
      })

      try{
        // payload로 전달받은 데이터를 채워 넣는다.
        const res = await _fetchMovie({
          ...payload, page: 1
        }) 
        const {Search, totalResults} = res.data
        //state에 데이터를 넣기 위함
        //commit으로 updateState 연결
        // Search는 omdb에서 받은 영화 정보들, totalResults는 영화 갯수(string 타입)
        // commit 안에 mutations을 작성할때 띄어쓰기 하나도 들어가면 안된다.
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        // totalResults를 10진법의 숫자로 변환
        const total = parseInt(totalResults, 10) // total => 영화 총 갯수
        // Math.ceil()는 올림 함수
        const pageLength = Math.ceil(total / 10) // pageLength =>  페이지 갯수 
        if(pageLength > 1){
          // page 반복문
          for(let page = 2; page <= pageLength; page += 1){
            // number 가 10일때 요청 x
            // number 가 20일때 요청 1번
            // number 가 30일때 요청 2번
            if(page > (payload.number / 10)){
              break
            }
            //추가 omdbapi 요청
            const res = await _fetchMovie({
              ...payload, page: page
            }) 
            const {Search} = res.data
            // 추가로 commit 
            // 기존에 state 에 있는 movies 값이 덮어씌워지지 않게  새로요청되는 Search 와 함께 구조분해후 새롭게 배열화
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch(message){
        commit('updateState', {
          movies: [],
          message : message
        })
      } finally{
        commit('updateState',{
          //로딩 끝
          loading: false
        })
      }
    }
  } 
}


function _fetchMovie(payload){
  // payload 구조분해
  // search 컴포넌트의 aply()매서드를 통해 전달받은 데이터가 내부로 들어간다.
  const {title, type, year, page} = payload
  // OMDB API 키
  const OMDB_API_KEY = '7035c60c'
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  return new Promise((resolve, reject)=>{
    axios.get(url)
      .then( res => {
        if(res.data.Error){
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch( err =>{
        reject(err.message)
      })
  })
}
