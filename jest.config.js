module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX files using babel-jest
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)'], // Ignore node_modules except axios
  };