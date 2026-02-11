import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Next.js uygulamasının yolu
  dir: "./",
});

const config: Config = {
  // Test ortamı
  testEnvironment: "jsdom",

  // Setup dosyası
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Test dosyalarının bulunacağı pattern
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // Type definition dosyalarını test olarak çalıştırma
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/cypress/", "\\.d\\.ts$"],

  // Coverage ayarları
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
  ],

  // Module path aliases
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
