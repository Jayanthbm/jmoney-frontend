import React, { useEffect, useState, useContext } from 'react';
import { Breadcrumb, List, Avatar, Skeleton, Row, Col } from 'antd';
import NavBar from '../Components/NavBar';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { AuthContext } from '../context';
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
      // Add a delay of 5 seconds to simulate a slow network connection
      setTimeout(() => {
        console.log(response.data);
        setData(response.data);
      }, 5000);
    }
    fetchData();
  }, [token]);

  return (
    <React.Fragment>
      <NavBar active={'profile'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <React.Fragment>
          {data ? (
            <React.Fragment>
              <Row>
                <Col span={12}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={data?.user?.image} />}
                      title={'Name'}
                      description={data?.user?.name}
                    />
                  </List.Item>
                </Col>
                <Col span={12}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={data?.user?.image} />}
                      title={'Email'}
                      description={data?.user?.email}
                    />
                  </List.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={data?.user?.image} />}
                      title={'Phone'}
                      description={data?.user?.phone}
                    />
                  </List.Item>
                </Col>
                <Col span={12}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={data?.user?.image} />}
                      title={'Currency'}
                      description={data?.user?.currency}
                    />
                  </List.Item>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <Skeleton active />
          )}
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default Profile;
