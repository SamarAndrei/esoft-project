// export default {
//     preset: 'ts-jest',
//     testEnvironment: 'jest-environment-jsdom',
//     transform: {
//         '^.+\\.tsx?$': 'ts-jest',
//         // process `*.tsx` files with `ts-jest`
//     },
//     moduleNameMapper: {
//         '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
//     },
// };
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
        '^.+\\.svg$': 'jest-svg-transformer',
        '^.+\\.css$': 'identity-obj-proxy',
    },
};

export default config;
