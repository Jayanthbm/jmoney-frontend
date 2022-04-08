import axiosClient from '../apiClient';
import { message } from 'antd';
export function getCategories() {
  message.info({
    content: 'loading data..',
    key: 'loading',
  });
  return axiosClient.get('/money/getCategories');
}

export function addCategory(data) {
  message.info({
    content: 'Adding Category..',
    key: 'loading',
  });
  return axiosClient.post('/money/addCategory', data);
}

export function deleteCategory(id) {
  message.warning({
    content: 'Deleting goal..',
    key: 'loading',
  });
  return axiosClient.delete(`/money/deleteCategory/${id}`);
}
