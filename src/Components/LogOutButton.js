import React, { useContext } from 'react';
import { Button } from 'antd';
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
      >
        Logout
      </Button>
      {props.children}
    </div>
  );
}

export default LogOutButton;
