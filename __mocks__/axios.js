// __mocks__/axios.js
const mockAxios = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    create: () => mockAxios,
  };
  
  export default mockAxios;
  