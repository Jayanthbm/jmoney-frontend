import React from 'react'
import { Row, Col } from 'antd';
function FourCol(props) {
  return (
    <React.Fragment>
      <Row>
         <Col xs={24} sm={12} md={8} lg={6} xl={6}>{props.col1}</Col>
         <Col xs={24} sm={12} md={8} lg={6} xl={6}>{props.col2}</Col>
         <Col xs={24} sm={12} md={8} lg={6} xl={6}>{props.col3}</Col>
         <Col xs={24} sm={12} md={8} lg={6} xl={6}>{props.col4}</Col>
      </Row>
    </React.Fragment>
  );
}

export default FourCol