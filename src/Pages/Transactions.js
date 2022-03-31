import React from 'react';
import { Breadcrumb } from 'antd';
import NavBar from '../Components/NavBar';
import LogOutButton from '../Components/LogOutButton';
function Transactions() {
  return (
    <React.Fragment>
      <NavBar active={'transactions'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Transactions</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <LogOutButton />
      </div>
    </React.Fragment>
  );
}

export default Transactions;