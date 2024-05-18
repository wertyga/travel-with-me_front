module.exports = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^react$',
    '^react-native$',
    '^@react-navigation',
    '^react(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@/.(?:assets|types|utils)',
    '@/utils',
    '@/types',
    '@/styles',
    '^@/assets',
    '^[./]', // This regex pattern matches relative imports
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
