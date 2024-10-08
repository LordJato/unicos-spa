/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import { createPinia } from 'pinia';
import { markRaw } from 'vue'

export function registerPlugins(app) {
  const pinia = createPinia()
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })
  app.use(router)
  app.use(vuetify)
  app.use(pinia)
}
