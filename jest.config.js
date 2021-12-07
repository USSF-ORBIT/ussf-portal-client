module.exports = {
  roots: ['<rootDir>', '<rootDir>/src/'],
  testPathIgnorePatterns: ['/node_modules/', '.next/', 'e2e/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(.keystone)/)'],
  watchPathIgnorePatterns: ['globalconfig'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^__mocks__/(.*)': '<rootDir>/src/__mocks__/$1',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^lib/(.*)': '<rootDir>/src/lib/$1',
    '^layout/(.*)': '<rootDir>/src/layout/$1',
    '^operations/(.*)': '<rootDir>/src/operations/$1',
    '^pages/(.*)': '<rootDir>/src/pages/$1',
    '^stores/(.*)': '<rootDir>/src/stores/$1',
    '^types/(.*)': '<rootDir>/src/types/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: '@shelf/jest-mongodb',
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 90,
      functions: 95,
      lines: 95,
    },
  },
}
