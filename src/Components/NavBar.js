import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
function NavBar(props) {
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
      </Menu>
    </Header>
  );
}

export default NavBar;
