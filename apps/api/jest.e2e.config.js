import unitConfig from './jest.config.js';

export default {
  ...unitConfig,
  rootDir: '.',
  roots: ['<rootDir>/test'],
  testRegex: '\\.e2e-spec\\.ts$',
  globalSetup: '<rootDir>/test/global-setup.js',
  maxWorkers: 1,
};
