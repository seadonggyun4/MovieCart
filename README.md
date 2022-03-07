# MovieCart

<br>
<br>
<br>

# ✅ MovieCart란?
OMDB API를 이용해 영화 데이터를 받아온뒤 , 사용자들이 검색한 영화를 화면에 보여줄수있는 간단한 영화검색 사이트 입니다.

<br>
<br>
<br>

# 🔨 기술스택: Vue, vuex, webpack, scss
| Skill | Info       | ✔   |
| ------ | --------------- | --------------- | 
| webpack    | webpack을 활용한 모듈 번들링 | ✔   |
| scss    | scss를 활용한 component단위 style 처리 | ✔   |
| vue    | component단위의 vue파일 생성 | ✔   |
|     | vue-router를 통한 SPA 디자인 패턴 적용 | ✔   |
| vuex | vuex의 store 기능을 통한 상태 관리 | ✔   |
|      | store의 데이터 모듈은 movie,about으로 구성 | ✔   |
| eslint | eslint를 통한 코드작성 규칙 설정 | ✔   |
| bable | bable을 통한 크로스브라우징 준수 | ✔   |

<br>
<br>
<br>

# 🔧 상태관리
- vuex 를 사용해 필요한 데이터를 movie, about 데이터 모듈로 나눠 필요한 컴포넌트에 사용하고있는 구조 이다.
- vuex를 사용해 상태관리를 진행하면 복잡하게 얽힌 컴포넌트간 데이터 통신이, 독립적인 store에 연결해 관리하면 되기때문에 편리해진다.

<br>
<br>

## movie 데이터 모듈
``` javascript
import axios from 'axios' // http 통신 도와주는 모듈 
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = '찾고싶은 영화를 검색해 보세요!!'

export default{
  //모듈화 가능하다는 의미
  namespaced: true, 
  /*
    [ data 형식]
  */
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
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
      state.movies = [],
      state.message = _defaultMessage,
      state.loading = false
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
      } catch(error){
        commit('updateState', {
          movies: [],
          message : error.message
        })
      } finally{
        commit('updateState',{
          //로딩 끝
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload){
      // state.loading 이 true일 경우 함수 실행 종료
      if(state.loading){
        return
      }

      // 로딩 시작
      commit('updateState',{
        theMovie: {},
        loading: true
      })
      
      const { id } = payload
      try{
        const res = await _fetchMovie({
          id: id
        })
        commit('updateState',{
          theMovie: res.data
        })
      } catch(error){
        commit('updateState',{
          theMovie: {}
        }) 
      } finally{
        commit('updateState', {
          loading: false
        })
      }
    }
  } 
}


async function _fetchMovie(payload){
  // netlify의 서버리스 함수로 payload(영화관련 데이터)를 보낸다
  // post 한 이후의 데이터를 반환 할수 있도록 return
  // netlify 호출시 앞에 . 을 붙혀야 한다.
  return await axios.post('/.netlify/functions/movie', payload)
}


```

<br>
<br>
<br>


# 🔧 서버리스 통신(Fass)
- 서버리스 함수란 서버가 존재하지 않는다는 뜻이 아니라 서버를 직접 관리할 필요가 없는 구조
- 영화 검색 api 키를 netlify(AWS의 Lamda) 와 같은 호스팅 서버의 서버리스 함수를 통해 보관했다가 사용자에게 데이터를 넘긴다.
- 사용자에게 넘어간 데이터에는 인증키가 없기때문에, 해커가 사용자의 컴퓨터를 해킹하더라도 api키 정보를 알아낼수 없다.

<br>
<br>

## 서버리스함수 movie.js
```javascript

//[ node.js 동작환경 ]

//aixos를 받아온다.
const axios = require('axios')
// OMDB API 키 -> .env 파일에 환경변수로 선언됬다.
const OMDB_API_KEY = process.env.OMDB_API_KEY

exports.handler = async function(event){
  //event.body를 네트워크 통신을 통해 받을때 문자 데이터로 받기때문에 이를 객체형식으로 변환해야 한다 -> JSON.parse()
  const payload = JSON.parse(event.body)

  // payload 구조분해
  // search 컴포넌트의 aply()매서드를 통해 전달받은 데이터가 내부로 들어간다.
  const {title, type, year, page, id} = payload
  // url주소는 삼항연산자 를 통해 id 값이 있는 경우 와 없는 경우로 나눠 넣는다. 삼항연산자  ======>   (조건 ? 참일때실행 : 거짓일때실행)
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` //id값이 있을때
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` //id값이 없을때
  //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  try{
    const res = await axios.get(url)
    if(res.data.Error){
      return{
        statusCode: 400,
        body: res.data.Error
      }
    } else {
      return{
        statusCode:200,
        body: JSON.stringify(res.data)
      }
    }
  }catch(error){
    return{
      statusCode: error.response.status,
      body: error.message
    }
  }
}

```
