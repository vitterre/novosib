import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Novosib',
  description: 'Информация к экзамену',
  base: '/',
  themeConfig: {
    nav: [
      {
        text: 'Главная',
        link: '/'
      }
    ],

    search: {
      provider: 'local'
    }
  },
})