import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context';

const { Header } = Layout;
function NavBar(props) {
  const { setToken } = useContext(AuthContext);
  const Logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
    <Header>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={[`${props.active}`]}
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
  );
}

export default NavBar;
