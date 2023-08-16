/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    // html: '<html lang="zh-cmn-Hant"></html>',
    // url: 'https://jestjs.io/',
    // userAgent: 'Agent/007',
  },
  moduleFileExtensions: ['js', 'ts', 'vue'],
  testMatch: ['<rootDir>/tests/**/*.spec.[jt]s?(x)'],

  setupFiles: ['<rootDir>/tests/setupTests.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': '@vue/vue2-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
}
