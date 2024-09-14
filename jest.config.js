module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JSX and JS files
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)' // Ignore node_modules except axios
    ],
    testEnvironment: 'jsdom',  // Ensure you're using jsdom for testing React components
  };
  