module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    moduleNameMapper: {
        '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^models/(.*)$': '<rootDir>/src/models/$1',
        '^dtos/(.*)$': '<rootDir>/src/dtos/$1',
        '^config/(.*)$': '<rootDir>/src/config/$1',
        '^tests/(.*)$': '<rootDir>/src/tests/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
    },
};
