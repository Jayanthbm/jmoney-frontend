import React from 'react';
import { Breadcrumb } from 'antd';
function CustomBreadcrumb(props) {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default CustomBreadcrumb;
