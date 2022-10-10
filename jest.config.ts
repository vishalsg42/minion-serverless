import baseConfig from "./jest-base.config"

export default {
  ...baseConfig,
  passWithNoTests: false,

  projects: ["<rootDir>/jest-eslint.config.ts", "<rootDir>/app",],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
}
