import {createApp} from 'vue'
import App from './App.vue'
import router from './routes/index.js'

createApp(App).use(router).mount('#app') // use는 플러그인 사용 함수(라우터 플러그인 연결)