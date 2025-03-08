module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  fakeTimers: {
    enableGlobally: false, // Try setting this to `false`
    legacyFakeTimers: true, // Or set this to use legacy mode
  },
  preset: 'ts-jest',
};
