import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'


import Divider from './components/Divider/Divider.vue'



const app = createApp(App)
const pinia = createPinia()


app.component('Divider', Divider)


app.use(router)
app.use(pinia)
app.mount('#app')
