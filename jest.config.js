module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '.next/', 'cypress/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(.keystone)/)'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^__mocks__/(.*)': '<rootDir>/src/__mocks__/$1',
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^layout/(.*)': '<rootDir>/src/layout/$1',
    '^pages/(.*)': '<rootDir>/src/pages/$1',
    '^stores/(.*)': '<rootDir>/src/stores/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
}
