// // import '@testing-library/jest-dom';

// jest.setup.ts
import '@testing-library/jest-dom';
import { afterEach, jest } from '@jest/globals';

afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});