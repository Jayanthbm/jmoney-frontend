import React from 'react';
import { Breadcrumb } from 'antd';
import NavBar from '../Components/NavBar';
function Insights() {
  return (
    <React.Fragment>
      <NavBar active={'insights'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Insights</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'></div>
    </React.Fragment>
  );
}

export default Insights;