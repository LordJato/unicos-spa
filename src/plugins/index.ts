/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify.ts'
import router from '@/router'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { markRaw } from 'vue'
import VueApexCharts from "vue3-apexcharts";

export function registerPlugins(app) {
  const pinia = createPinia()
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })
  pinia.use(piniaPluginPersistedstate)
  app.use(router)
  app.use(vuetify)
  app.use(pinia)
  app.use(VueApexCharts);
}
