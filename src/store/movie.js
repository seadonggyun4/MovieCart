import axios from 'axios' // http 통신 도와주는 모듈 

export default{
  //모듈화 가능하다는 의미
  namespaced: true, 
  //data 형식
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }), 
  // computed 형식
  // state와 연결되기 위해 내부 함수는 매개변수로 state를 받아야 한다.
  getters: {},
  // methods 형식
  // 데이터 수정은 mutations 에서만 가능
  // 즉 mutations는 데이터 변경만을 위한 매서드, 그외 매서드는 actions에서 처리
  // actions는 기본적으로 비동기로 처리되는 매서드(state를 바로 받아서 처리하지는 못한다.)
  mutations:{
    //state 의 데이터를 갱신하는 매서드
    updataState(state,payload){
      //새로운 배열데이터 생성
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.moives = []
    }
  }, 
  actions:{
    // context는 state, getters, mutations를 활용할수 있는 내용
    // payload는 searchMovies를 활용할때 인수로 들어온 특정한 데이터 활용
    async searchMovies({state, commit}, payload){
      // payload 구조분해
      // search 컴포넌트의 aply()매서드를 통해 전달받은 데이터가 내부로 들어간다.
      const {title, type, number, year } = payload
      // OMDB API 키
      const OMDB_API_KEEY = '7035c60c'
      
      // [리퀘스트]
      // omdb api 의 영화데이터 리퀘스트 주소(반드시 https로)
      // axios 패키지를 활용해 받는다.
      // axios.get()으로 받은 주소 뒤의 파라메터는 "&파라매터" 형식으로 작성해야 한다.
      // await는 반환받을때까지 기다린다.

      // [리스폰스]
      // 반환받은 값은 res 에 저장한다.


      // payload로 전달받은 데이터를 채워 넣는다.
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEEY}&s=${title}&type=${type}&y=${year}&page=1`) 

      const {Search, totalResults} = res.data
      //state에 데이터를 넣기 위함
      //commit으로 updateState 연결
      // Search는 omdb에서 받은 영화 정보들, totalResults는 영화 갯수(string 타입)
      // commit 안에 mutations을 작성할때 띄어쓰기 하나도 들어가면 안된다.
      commit('updataState', {
        movies: Search
      })

      // totalResults를 10진법의 숫자로 변환
      const total = parseInt(totalResults, 10)
      // Math.ceil()는 올림 함수
      const pageLength = Math.ceil(total / 10)

      if(pageLength > 1){

        for(let page = 2; page <= pageLength; page += 1){
          if(page > (number / 10)){
            break
          }
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEEY}&s=${title}&type=${type}&y=${year}&page=${page}`) 
          const {Search} = res.data

          commit('updataState', {
            movies: [...state.moives, ...Search]
          })
        }
      }
    }
  } 
}

