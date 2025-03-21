module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': ['@swc/jest'],
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: "../coverage",
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/../src/$1"
    }
};