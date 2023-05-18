import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/jest/styles.js",
  },
  automock: false,
  resetMocks: false,
  collectCoverageFrom: [
    "src/**/*.{jsx,tsx}",
    "!src/index.tsx",
    "!<rootDir>/node_modules/",
    "!<rootDir>/path/to/dir/",
  ],
  verbose: true,
  /* coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  }, */
};

export default config;
