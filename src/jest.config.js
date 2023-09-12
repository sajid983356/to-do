module.exports = {
    verbose: true,
    collectCoverage: true, // Enable code coverage
    coverageDirectory: 'coverage', // Specify the directory for coverage reports
    testEnvironment: 'jsdom', // Set the test environment
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.jsx$': 'babel-jest',
    },
  };
  