import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { ROUTE_NAMES } from './helpers/enums'

const app = createApp(App)

app.config.globalProperties.$routes = ROUTE_NAMES

app.use(store).use(router).mount('#app')
