import axios from 'axios';

const token = localStorage.getItem('token');
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default apiClient;
