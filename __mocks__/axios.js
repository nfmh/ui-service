// __mocks__/axios.js
const axios = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  };
  
  export default axios;
  