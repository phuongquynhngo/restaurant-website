import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'


import Divider from './components/Divider/Divider.vue'



const app = createApp(App)


app.component('Divider', Divider)

app.use(router)
app.mount('#app')
