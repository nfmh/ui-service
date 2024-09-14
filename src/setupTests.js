// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock MutationObserver to avoid the error in all tests
class MutationObserver {
  disconnect() {
    // Add a simple console log or return to silence the "empty method" warning
    console.log('disconnect called');
  }
  
  observe(element, initObject) {
    // Add a simple console log or return to silence the "empty method" warning
    console.log('observe called on', element);
  }
  
  takeRecords() {
    return []; // This can return an empty array as it is harmless for the mock
  }
  
  unobserve() {
    // Add a simple console log or return to silence the "empty method" warning
    console.log('unobserve called');
  }
}

window.MutationObserver = MutationObserver;
