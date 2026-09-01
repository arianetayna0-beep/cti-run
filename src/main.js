import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa as rotas de src/router/index.js
import './style.css' // Importa o Tailwind CSS[cite: 1]

const app = createApp(App)

app.use(router) // Registra o Vue Router na aplicação[cite: 1]
app.mount('#app')