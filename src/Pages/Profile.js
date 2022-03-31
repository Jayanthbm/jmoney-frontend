import React, { useEffect, useState, useContext } from 'react';
import {
  Breadcrumb,
  Divider,
  Skeleton,
  Row,
  Col,
  Empty,
  Timeline,
  Tag,
  Button,
  Popconfirm,
} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { AuthContext } from '../context';
import CustomCard from '../Components/CustomCard';
function Profile() {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
    }
    fetchData();
  }, [token]);

  const CategoryItem = (props) => {
    return (
      <span>
        <Tag
          color={props.type === 'income' ? 'green' : 'red'}
          style={{ marginBottom: 10, marginLeft: 10 }}
        >
          {props.name}
        </Tag>
        <Popconfirm
          title='Are you sure to delete this Category?'
          onConfirm={() => {
            alert('deleted');
          }}
          onCancel={() => {
            alert('cancelled');
          }}
          okText='Yes'
          cancelText='No'
        >
          <DeleteTwoTone twoToneColor='red' />
        </Popconfirm>
      </span>
    );
  };
  return (
    <React.Fragment>
      <NavBar active={'profile'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <React.Fragment>
          <Row>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <CustomCard>
                <Skeleton loading={data ? false : true} active>
                  <Divider orientation='left'>User Info</Divider>
                  <Timeline>
                    <Timeline.Item color={'green'}>
                      <b>Name</b> :{data?.user?.name}
                    </Timeline.Item>
                    <Timeline.Item color={'red'}>
                      <b>Email</b>:{data?.user?.email}
                    </Timeline.Item>
                    <Timeline.Item color={'blue'}>
                      <b>Mobile</b>:{data?.user?.phone}
                    </Timeline.Item>
                    <Timeline.Item color={'grey'}>
                      <b>Currency</b>:{data?.user?.currency}
                    </Timeline.Item>
                  </Timeline>
                </Skeleton>
              </CustomCard>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <CustomCard>
                <Skeleton loading={data ? false : true} active>
                  <Divider orientation='right'>
                    <Button type='primary'>Add Category</Button>
                  </Divider>
                  <Divider orientation='left'>Income Categories</Divider>
                  {data?.incomeCategories?.length > 0 ? (
                    <React.Fragment></React.Fragment>
                  ) : (
                    <Empty />
                  )}
                </Skeleton>
              </CustomCard>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <CustomCard>
                <Skeleton loading={data ? false : true} active>
                  <Divider orientation='right'>
                    <Button type='primary'>Add Category</Button>
                  </Divider>
                  <Divider orientation='left'>Expense Categories</Divider>
                  {data?.expenseCategories?.length > 0 ? <></> : <Empty />}
                </Skeleton>
              </CustomCard>
            </Col>
          </Row>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default Profile;
