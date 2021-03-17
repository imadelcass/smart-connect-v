import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com',
  baseURL: 'https://creat-api.herokuapp.com',
  // baseURL: 'http://localhost:8001',
});

export default instance;
