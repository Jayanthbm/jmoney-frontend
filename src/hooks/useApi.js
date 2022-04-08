/* eslint-disable import/no-anonymous-default-export */
import { useState } from 'react';
import { message } from 'antd';
export default (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    message.info({
      content: 'Loading.. please wait',
      key: 'loading',
    });
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err) {
      setError(err.message || 'Unexpected Error!');
    } finally {
      message.destroy('loading');
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
