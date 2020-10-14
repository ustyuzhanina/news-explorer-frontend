module.exports = {
  root: true,

  levels: [ { path: 'src/blocks' } ],

  modules: {
    'bem-tools': {
      plugins: {
        create: {
          // Настройки уровней
          levels: [
            {
              path: 'src/blocks', // Уровень по умолчанию
              // если уровень не задан
              default: true,
              // Технологии по умолчанию для создания блоков на уровне
              techs: [ 'css' ],
            },
          ],
        },
      },
    },
  },
};