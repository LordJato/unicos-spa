/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

//Utility
import can from './helpers/can'
import './assets/styles/global.css'

const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.$can = can

app.mount('#app')


