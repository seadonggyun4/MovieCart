import {createStore} from 'vuex'
import movie from './movie.js'
import about from './about.js'

export default createStore({
  //데이터 모듈
  modules: {
    movie: movie,
    about: about
  }
})