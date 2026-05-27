import baseConfig from '../../packages/config/eslint.base.mjs';

export default [
  ...baseConfig,
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
