module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],

  plugins: [
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-json-strings',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta'
  ]
};
