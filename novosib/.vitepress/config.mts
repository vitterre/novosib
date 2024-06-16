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
        text: 'Модуль 1',
        link: '/docs/module-one',
        items: [
          { text: 'Задание 1', link: 'docs/module-one/task-one/index.md' },
          { text: 'Задание 2', link: 'docs/module-one/task-two/index.md' },
          { text: 'Задание 3', link: 'docs/module-one/task-three/index.md' },
          { text: 'Задание 4', link: 'docs/module-one/task-four/index.md' },
          { text: 'Задание 5', link: 'docs/module-one/task-five/index.md' },
          { text: 'Задание 6', link: 'docs/module-one/task-six/index.md' },
          { text: 'Задание 7', link: 'docs/module-one/task-seven/index.md' },
          { text: 'Задание 8', link: 'docs/module-one/task-eight/index.md' },
        ]
      }
    ],

    search: {
      provider: 'local'
    }
  },
})