import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-sync-scripts': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-css-tags': 'off',
      '@next/next/google-font-display': 'off',
      '@next/next/google-font-preconnect': 'off',
      '@next/next/no-document-import-in-page': 'off',
      '@next/next/no-head-import-in-document': 'off',
      '@next/next/no-title-in-document-head': 'off',
      typescript: 'off',
    },
  }),
]

export default eslintConfig
