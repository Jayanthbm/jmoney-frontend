import axiosClient from '../apiClient';
import { message } from 'antd';

export function loginUser(data) {
  message.info({
    content: 'Logging in.. Please wait',
    key: 'loading',
  });
  return axiosClient.post('/auth/login', data);
}

export function registerUser(data) {
  message.info({
    content: 'Registering..',
    key: 'loading',
  });
  return axiosClient.post('/auth/register', data);
}
