import axiosClient from '../apiClient';
import { message } from 'antd';
export function getGoals(search) {
  message.info({
    content: 'loading goals..',
    key: 'loading',
  });
  let url = '/money/user-goals';
  if (search?.length > 0) {
    url += `?search=${search}`;
  }
  return axiosClient.get(url);
}

export function addGoal(data) {
  message.info({
    content: 'Adding goal..',
    key: 'loading',
  });
  return axiosClient.post('/money/addUserGoal', data);
}

export function editGoal(id, data) {
  message.info({
    content: 'Updating goal..',
    key: 'loading',
  });
  return axiosClient.put(`/money/updateUserGoal/${id}`, data);
}

export function deleteGoal(id) {
  message.warning({
    content: 'Deleting goal..',
    key: 'loading',
  });
  return axiosClient.delete(`/money/deleteUserGoal/${id}`);
}
