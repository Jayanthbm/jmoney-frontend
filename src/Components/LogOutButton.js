import React, { useContext } from 'react';
import { Button } from 'antd';
import { AuthContext } from '../context';
function LogOutButton() {
  const { logout } = useContext(AuthContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <Button
        type='primary'
        danger
        onClick={logout}
        style={{ borderRadius: 5 }}
      >
        Logout
      </Button>
    </div>
  );
}

export default LogOutButton;
