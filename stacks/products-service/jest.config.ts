/* eslint-disable */
export default {
  displayName: 'products-service',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  coverageDirectory: '../../coverage/stacks/products-service',
};
