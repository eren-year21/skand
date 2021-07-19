/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  runner: 'jest-runner-concurrent',
  coverageReporters: [
    'text',
    'html',
    'lcov',
  ],
  transform: {
    '.tsx?$': 'ts-jest',
    '^.+\\.(css|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testMatch: null,
  testURL: 'http://0.0.0.0',
  moduleNameMapper: {
    // eslint-disable-next-line max-len
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts',
    '^@types/(.*)': '<rootDir>/src/@types/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/setup'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
    HOST_URL: 'http://0.0.0.0',
  },
  setupFilesAfterEnv: ['<rootDir>/setup/enzyme.js'],
};
