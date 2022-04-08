import axios from 'axios';
import { message } from 'antd';
const token = localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    message.destroy('loading');
    if (response?.data.message) {
      message.success(response?.data?.message, 3);
    }
    return response;
  },
  function (error) {
    message.destroy('loading');
    let res = error.response;
    message.error(res?.data?.message, 3);
    return Promise.reject(error);
  }
);

export default axiosClient;
