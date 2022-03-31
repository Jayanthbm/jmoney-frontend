import React from 'react';
import { Card } from 'antd';
const CustomCard = ({ children }) => {
  return (
    <Card
      hoverable
      style={{
        marginTop: 16,
        width: 'auto',
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 15,
      }}
    >
      {children}
    </Card>
  );
};
export default CustomCard;
