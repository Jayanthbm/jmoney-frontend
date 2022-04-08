import axiosClient from '../apiClient';
import { message } from 'antd';
export function getProfile() {
  message.info({
    content: 'loading profile..',
    key: 'loading',
  });
  return axiosClient.get('/auth/profile');
}
