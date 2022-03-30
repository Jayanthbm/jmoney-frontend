import React from 'react';
import { Breadcrumb } from 'antd';
import NavBar from '../Components/NavBar';
function Transactions() {
  return (
    <React.Fragment>
      <NavBar active={'transactions'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Transactions</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'></div>
    </React.Fragment>
  );
}

export default Transactions;