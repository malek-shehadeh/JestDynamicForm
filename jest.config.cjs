// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   testMatch: ["**/?(*.)+(test).(ts|tsx)"],
//   moduleNameMapper: {
//     "^.+\\.css$": "identity-obj-proxy",
//   },
//   setupFilesAfterEnv: ["./jest.setup.ts"],
// };


/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(test).(ts|tsx)"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};