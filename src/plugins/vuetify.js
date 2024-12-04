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

const lightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#213268',
    secondary: '#36c5c8',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'white-primary': '#e9f2fb',
    'on-surface': '#212121',
    'on-background': '#212121',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#070f2b',
    surface: '#070F2B',
    primary: '#213268',
    secondary: '#36c5c8',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'white-primary': '#9DB2BF',
    'on-surface': '#9DB2BF',
    'on-background': '#9DB2BF',
    'dark-grey': '#0b1420'
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
})
