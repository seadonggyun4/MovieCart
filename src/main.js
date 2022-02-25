import {createApp} from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store/index.js'

createApp(App)
  .use(router) // use는 플러그인 사용 함수(라우터 플러그인 연결)
  .use(store) // vuex(store) 연결
  .mount('#app') //html 연결