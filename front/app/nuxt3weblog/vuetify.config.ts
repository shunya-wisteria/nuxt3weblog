import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: { // 以下で色を指定する（下記はデフォルト色）{
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      }
    }
  }
})