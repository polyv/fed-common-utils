module.exports = {
  root: true,
  extends: [
    './node_modules/@polyv/eslint-config/lib/for-js',
    './node_modules/@polyv/eslint-config/lib/for-ts',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
