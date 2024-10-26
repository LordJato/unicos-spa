/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#213268',
    secondary: '#5CB85C',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'white-primary' : '#FAFAFA',
    'white-secondary' : '#e9f2fb',
    'primary-1' : '#133A85',
    'primary-2' : '#1E2C53',
    'primary-3' : '#161A33'
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})
