module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JSX and JS files
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)'], // Ensure axios is transformed
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // This sets up test environments, if necessary
  };
  