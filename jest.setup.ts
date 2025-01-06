import '@testing-library/jest-dom';

// Mock IndexedDB
const indexedDB = {
  open: jest.fn().mockReturnValue({
    onupgradeneeded: null,
    onsuccess: null,
    onerror: null,
    result: {
      transaction: jest.fn().mockReturnValue({
        objectStore: jest.fn().mockReturnValue({
          add: jest.fn(),
          put: jest.fn(),
          delete: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn(),
        }),
      }),
      objectStoreNames: {
        contains: jest.fn().mockReturnValue(true),
      },
      createObjectStore: jest.fn(),
    },
  }),
};

// Extend the global object with our mock
Object.defineProperty(global, 'indexedDB', {
  value: indexedDB,
  writable: true,
});
