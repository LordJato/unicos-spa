import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify, type ThemeDefinition } from 'vuetify'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#e9f2fb',
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

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#070f2b',
    surface: '#070f2b',
    primary: '#213268',
    'on-primary': '#e9f2fb',
    secondary: '#36c5c8',
    'on-secondary': '#FFFFFF',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'white-primary': '#e9f2fb',
    'on-surface': '#9DB2BF',
    'on-background': '#9DB2BF',
    'dark-grey': '#0b1420'
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  defaults: {
    VSelect: {
      density: 'compact'
    },
    VTextField: {
      density: 'compact'
    },
    VBtn: {
      class: 'text-caption',
    },
  },
});
