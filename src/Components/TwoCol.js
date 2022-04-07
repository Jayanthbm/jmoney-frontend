import React from 'react'
import { Row, Col } from 'antd';
function TwoCol(props) {
  return (
    <React.Fragment>
      <Row>
         <Col xs={24} sm={24} md={12} lg={12} xl={12}>{props.col1}</Col>
         <Col xs={24} sm={24} md={12} lg={12} xl={12}>{props.col2}</Col>
      </Row>
    </React.Fragment>
  );
}

export default TwoCol