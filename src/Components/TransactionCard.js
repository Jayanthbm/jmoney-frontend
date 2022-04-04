import React from 'react';
import {
  Card,
  Statistic,
  Row,
  Col,
  Divider,
  Tag,
  Badge,
  Popconfirm,
  Button,
} from 'antd';
import { DollarCircleFilled } from '@ant-design/icons';
const moment = require('moment');
function TransactionCard(props) {
  return (
    <Badge.Ribbon
      text={props.transaction?.type[0]}
      color={props.transaction?.type[0] === 'income' ? '#52c41a' : '#f5222d'}
    >
      <Card
        hoverable
        style={{
          marginBottom: 5,
          marginTop: 5,
        }}
      >
        <div>
          <Row>
            <Divider orientation='left' plain>
              {moment(props.transaction.date).format('DD-MM-YYYY')}
            </Divider>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Statistic
                title='Amount'
                value={props.transaction.amount}
                prefix={
                  <DollarCircleFilled
                    style={{
                      color:
                        props.transaction?.type[0] === 'income'
                          ? '#52c41a'
                          : '#f5222d',
                    }}
                  />
                }
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Divider orientation='left' plain>
                Category
              </Divider>
              <Tag color='#f50'>{props?.transaction?.category?.name}</Tag>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Divider orientation='right' plain>
                Actions
              </Divider>
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Popconfirm
                  title='Are you sure to delete?'
                  onConfirm={props.onDelete}
                >
                  <Button type='primary' danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Button
                  type='primary'
                  style={{
                    marginRight: 2,
                    background:
                      props.transaction?.type[0] === 'income'
                        ? '#52c41a'
                        : '#ff9966',
                    borderColor:
                      props.transaction?.type[0] === 'income'
                        ? '#52c41a'
                        : '#ff9966',
                  }}
                  onClick={props.onEdit}
                >
                  Edit
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Badge.Ribbon>
  );
}

export default TransactionCard;
