import React, { useContext } from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { AuthContext } from '../context';
function LogOutButton(props) {
  const { logout } = useContext(AuthContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Button
        type='primary'
        danger
        onClick={logout}
        style={{ borderRadius: 5, marginLeft: 5 }}
        icon={<LogoutOutlined />}
      >
        Logout
      </Button>
      {props.children}
    </div>
  );
}

export default LogOutButton;
