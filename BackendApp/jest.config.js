module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['./src/**/*.js'],
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    coverageDirectory: '<rootDir>/tests/coverage',
};
