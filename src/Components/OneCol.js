import React from 'react'
import {Row,Col} from 'antd';
function OneCol(props) {
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {props.col1}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default OneCol