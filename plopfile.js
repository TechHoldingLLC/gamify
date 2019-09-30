// Example plopfiles available in the docs:
// https://plopjs.com/documentation/
// https://github.com/SBoudrias/Inquirer.js/#prompt-types

module.exports = function plopper(plop) {
  plop.setGenerator('component', {
    description: 'This generator makes a React component!',
    prompts: [
      {
        type: 'list',
        name: 'component-type',
        message: 'What type of component? https://reactfaq.site/components/component-types/',
        choices: ['container', 'hoc', 'page', 'placeholder', 'presentational'],
        default: 'placeholder',
      },

      {
        type: 'input',
        name: 'location',
        message: 'location (src/$location/$name/index.jsx)',
        default: 'components',
      },

      {
        type: 'input',
        name: 'name',
        message: 'Give your component a name',
        default: '',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{location}}/{{name}}/index.jsx',
        templateFile: 'plop-templates/components/{{component-type}}.index.jsx',
      },
      {
        type: 'add',
        path: 'src/{{location}}/{{name}}/{{name}}.test.jsx',
        templateFile: 'plop-templates/components/Component.test.jsx',
      },
      {
        type: 'add',
        path: 'src/{{location}}/{{name}}/{{name}}.module.scss',
        templateFile: 'plop-templates/components/Component.module.scss',
      },
    ],
  });
};
