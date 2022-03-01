import {createApp} from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store/index.js'
import loadImage from './Plugins/loadImage.js'

createApp(App)
  .use(router) // use는 플러그인 사용 함수(라우터 플러그인 연결)
  .use(store) // vuex(store) 연결
  .use(loadImage) // LoadImage 플러그인 사용
  .mount('#app') //html 연결