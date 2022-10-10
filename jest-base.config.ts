const baseConfig = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ["/test/.*\\.(test|spec)?\\.(ts|tsx)$"],
  // testResultsProcessor: "jest-sonar-reporter",
  passWithNoTests: true,
}

export default baseConfig
