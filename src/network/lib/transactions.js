import axiosClient from '../apiClient';
import { message } from 'antd';

export function getTransactions(page, pageSize, type, categoryId, year, month) {
  message.info({
    content: 'loading transactions..',
    key: 'loading',
  });
  let url = '/money/transactions';
  if (page) {
    url += `?page=${page}`;
  } else {
    url += '?page=1';
  }
  if (pageSize) {
    url += `&pageSize=${pageSize}`;
  }
  if (type) {
    url += `&type=${type}`;
  }
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  if (year) {
    url += `&year=${year}`;
  }
  if (month) {
    url += `&month=${month}`;
  }
  return axiosClient.get(url);
}

export function addTransaction(transaction) {
  message.info({
    content: 'adding transaction..',
    key: 'loading',
  });
  return axiosClient.post('/money/transactions', transaction);
}

export function updateTransaction(id, transaction) {
  message.info({
    content: 'updating transaction..',
    key: 'loading',
  });
  return axiosClient.put(`/money/transactions/${id}`, transaction);
}

export function deleteTransaction(id) {
  message.warning({
    content: 'deleting transaction..',
    key: 'loading',
  });
  return axiosClient.delete(`/money/transactions/${id}`);
}
