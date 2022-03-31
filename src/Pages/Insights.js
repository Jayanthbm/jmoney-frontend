import React from 'react';
import { Breadcrumb } from 'antd';
import NavBar from '../Components/NavBar';
import LogOutButton from '../Components/LogOutButton';
function Insights() {
  return (
    <React.Fragment>
      <NavBar active={'insights'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Insights</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <LogOutButton />
      </div>
    </React.Fragment>
  );
}

export default Insights;