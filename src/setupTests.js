// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


// setupTests.js

// Mock MutationObserver to avoid the error in all tests
class MutationObserver {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
    takeRecords() { return []; }
    unobserve() {}
  }
  
  window.MutationObserver = MutationObserver;
  