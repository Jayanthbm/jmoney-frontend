import React from 'react';
import { Breadcrumb } from 'antd';
import NavBar from '../Components/NavBar';
function Dashboard() {
  return (
    <React.Fragment>
      <NavBar active={'dashboard'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'></div>
    </React.Fragment>
  );
}

export default Dashboard;
