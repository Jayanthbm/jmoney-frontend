import React from 'react';
import { Breadcrumb } from 'antd';
import NavBar from '../Components/NavBar';
function Profile() {
  return (
    <React.Fragment>
      <NavBar active={'profile'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'></div>
    </React.Fragment>
  );
}

export default Profile;
