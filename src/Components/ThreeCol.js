import React from 'react'
import { Row, Col } from 'antd';
function ThreeCol(props) {
  return (
    <React.Fragment>
      <Row>
         <Col xs={24} sm={12} md={8} lg={8} xl={8}>{props.col1}</Col>
         <Col xs={24} sm={12} md={8} lg={8} xl={8}>{props.col2}</Col>
         <Col xs={24} sm={12} md={8} lg={8} xl={8}>{props.col3}</Col>
      </Row>
    </React.Fragment>
  );
}

export default ThreeCol