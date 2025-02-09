/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify';
import router from '@/router';
import { createPinia, Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { markRaw, App } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export function registerPlugins(app: App): void {
  const pinia: Pinia = createPinia();
  
  pinia.use(({ store }) => {
    (store as any).router = markRaw(router);
  });

  pinia.use(piniaPluginPersistedstate);

  app.use(router);
  app.use(vuetify);
  app.use(pinia);
  app.use(VueApexCharts);
}
