import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import Insights from './Pages/Insights';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Transactions from './Pages/Transactions';
import { useContext } from 'react';
import { AuthContext } from './context';
import { Layout } from 'antd';
const { Content } = Layout;
const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <>
      <Content style={{ padding: '20px 60px 20px 60px' }}>
        <Routes>
          <Route
            path='/'
            element={<Navigate to={token ? '/dashboard' : '/login'} />}
          />
          {token ? (
            <>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/goals' element={<Goals />} />
              <Route path='/insights' element={<Insights />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/profile' element={<Profile />} />
            </>
          ) : (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </>
          )}
          <Route
            path='*'
            element={<Navigate to={token ? '/dashboard' : '/login'} />}
          />
        </Routes>
      </Content>
    </>
  );
};
export default App;
