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
      },
      {
        text: 'Задания',
        link: '/docs'
      }
    ],

    sidebar: [
      {
        text: 'Задания к экзамену',
        link: '/docs/index.md',
        items: [
          {
            text: 'Модуль 1',
            link: '/docs/module-one/index.md',
            items: [
              { text: 'Задание 1', link: '/docs/module-one/task-one.md' },
              { text: 'Задание 2', link: '/docs/module-one/task-two.md' },
              { text: 'Задание 3', link: '/docs/module-one/task-three.md' },
              { text: 'Задание 4', link: '/docs/module-one/task-four.md' },
              { text: 'Задание 5', link: '/docs/module-one/task-five.md' },
              { text: 'Задание 6', link: '/docs/module-one/task-six.md' },
              { text: 'Задание 7', link: '/docs/module-one/task-seven.md' },
              { text: 'Задание 8', link: '/docs/module-one/task-eight.md' },
            ]
          }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Сделано для чубриков с новосиба',
      copyright: 'Copyright © 2024 Dagestan x Kazan'
    }
  },
})