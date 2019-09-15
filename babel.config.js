/* eslint global-require: 0 */
const path = require('path');

const devPlugins = [
  // require('babel-plugin-flow-runtime')
];

const prodPlugins = [
  require('babel-plugin-dev-expression'),

  // Formerly babel-preset-react-optimize
  require('@babel/plugin-transform-react-constant-elements'),
  require('@babel/plugin-transform-react-inline-elements'),
  require('babel-plugin-transform-react-remove-prop-types')
  // require('babel-plugin-transform-react-pure-class-to-function') // POSSIBLY UNSTABLE
];

module.exports = api => {
  const isDevEnv = api.env(['development', 'test']);

  return {
    presets: [
      [
        require('@babel/preset-env'),
        {
          targets: { node: 10 },
          useBuiltIns: 'usage',
          corejs: '3.2.1'
        }
      ],
      require('@babel/preset-flow'),
      [
        require('@babel/preset-react'),
        { development: api.env(['development, test']) }
      ]
    ],
    plugins: [
      ...(isDevEnv ? devPlugins : prodPlugins),
      [
        require('babel-plugin-module-resolver'),
        {
          extensions: ['.js', '.jsx', '.json'],
          root: ['./app'],
          alias: {
            App: path.resolve(__dirname, 'app/'),
            ui$: path.resolve(__dirname, 'ui/index.js'),
            Reducers: path.resolve(__dirname, 'app/reducers/')
          }
        }
      ],

      require('babel-plugin-styled-components'),

      // Stage 0
      require('@babel/plugin-proposal-function-bind'),

      // Stage 1
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-logical-assignment-operators'),
      [require('@babel/plugin-proposal-optional-chaining'), { loose: false }],
      [
        require('@babel/plugin-proposal-pipeline-operator'),
        { proposal: 'minimal' }
      ],
      [
        require('@babel/plugin-proposal-nullish-coalescing-operator'),
        { loose: false }
      ],
      require('@babel/plugin-proposal-do-expressions'),

      // Stage 2
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
      require('@babel/plugin-proposal-function-sent'),
      require('@babel/plugin-proposal-export-namespace-from'),
      require('@babel/plugin-proposal-numeric-separator'),
      require('@babel/plugin-proposal-throw-expressions'),

      // Stage 3
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-syntax-import-meta'),
      [require('@babel/plugin-proposal-class-properties'), { loose: true }],
      require('@babel/plugin-proposal-json-strings')
    ]
  };
};
