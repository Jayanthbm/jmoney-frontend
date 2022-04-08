import client from './client';

const getProfile = () => client.get('/auth/profile');

// eslint-disable-next-line import/no-anonymous-default-export
export default { getProfile };
