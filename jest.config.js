module.exports = {
  roots: ['<rootDir>', '<rootDir>/src/'],
  testPathIgnorePatterns: ['/node_modules/', '.next/', 'e2e/', 'generated/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  watchPathIgnorePatterns: ['globalconfig'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^__fixtures__/(.*)': '<rootDir>/src/__fixtures__/$1',
    '^__mocks__/(.*)': '<rootDir>/src/__mocks__/$1',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^constants/(.*)': '<rootDir>/src/constants/$1',
    '^helpers/(.*)': '<rootDir>/src/helpers/$1',
    '^hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^layout/(.*)': '<rootDir>/src/layout/$1',
    '^lib/(.*)': '<rootDir>/src/lib/$1',
    '^models/(.*)': '<rootDir>/src/models/$1',
    '^operations/(.*)': '<rootDir>/src/operations/$1',
    '^pages/(.*)': '<rootDir>/src/pages/$1',
    '^resolvers/(.*)': '<rootDir>/src/resolvers/$1',
    '^stores/(.*)': '<rootDir>/src/stores/$1',
    '^types/(.*)': '<rootDir>/src/types/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: '@shelf/jest-mongodb',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 88,
      functions: 90,
      lines: 90,
    },
  },
}
