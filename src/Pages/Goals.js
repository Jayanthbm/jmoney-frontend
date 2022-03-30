import React from 'react';
import { Breadcrumb } from 'antd';
import NavBar from '../Components/NavBar';
function Goals() {
  return (
    <React.Fragment>
      <NavBar active={'goals'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Goals</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'></div>
    </React.Fragment>
  );
}

export default Goals;
