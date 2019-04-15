module.exports = {
  transform: {
    ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|ts)x?$',
};
