import './App.css';
import { Navigate, Route, Routes, Link } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import Insights from './Pages/Insights';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Transactions from './Pages/Transactions';
import { useContext } from 'react';
import { AuthContext } from './context';
import { Layout, Menu } from 'antd';

const { Header } = Layout;
const App = () => {
  const { token, setToken } = useContext(AuthContext);
  const Logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
    <>
      {token && (
        <Header>
          <Menu
            theme='light'
            mode='horizontal'
            defaultSelectedKeys={['dashboard']}
          >
            <Menu.Item key={'dashboard'}>
              <Link to='/dashboard'>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key={'goals'}>
              <Link to='/goals'>Goals</Link>
            </Menu.Item>
            <Menu.Item key={'insights'}>
              <Link to='/insights'>Insights</Link>
            </Menu.Item>
            <Menu.Item key={'transactions'}>
              <Link to='/transactions'>Transactions</Link>
            </Menu.Item>
            <Menu.Item key={'profile'}>
              <Link to='/profile'>Profile</Link>
            </Menu.Item>
            <Menu.Item key={'logout'}>
              <Link to='/' onClick={Logout}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      )}
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
    </>
  );
};
export default App;
