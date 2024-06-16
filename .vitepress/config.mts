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
              { text: 'Задание 1', link: '/docs/module-one/task-one' },
              { text: 'Задание 2', link: '/docs/module-one/task-two' },
              { text: 'Задание 3', link: '/docs/module-one/task-three' },
              { text: 'Задание 4', link: '/docs/module-one/task-four' },
              { text: 'Задание 5', link: '/docs/module-one/task-five' },
              { text: 'Задание 6', link: '/docs/module-one/task-six' },
              { text: 'Задание 7', link: '/docs/module-one/task-seven' },
              { text: 'Задание 8', link: '/docs/module-one/task-eight' },
              { text: 'Настройка Network Manager', link: '/docs/module-one/network-manager' }
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