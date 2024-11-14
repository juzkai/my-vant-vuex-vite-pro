import { createApp } from 'vue'
import './styles/index.less'
import App from './App.vue'
import router from './router'
import { setupStore } from './store'
import setVantConfig from './config/setVantConfig'
import './permission'
import global from './utils/global'

const app = createApp(App)
app.use(router)
setupStore(app)
setVantConfig.init()
app.use(global)
app.mount('#app')
