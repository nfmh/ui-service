module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JSX and JS files
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)']
  };
  