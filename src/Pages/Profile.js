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
  Modal,
  Input,
  Form,
  message,
} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { AuthContext } from '../context';
import CustomCard from '../Components/CustomCard';
import LogOutButton from '../Components/LogOutButton';
function Profile() {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const { token } = useContext(AuthContext);
  const [form] = Form.useForm();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    }
    fetchData();
  }, [token, reload]);

  const [addCategoryType, setAddCategoryType] = useState('Income');
  const [CategoryModal, setCategoryModal] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const addCategoryModal = (type) => {
    setAddCategoryType(type);
    setCategoryModal(true);
  };

  const addCategory = async () => {
    message.info({
      content: 'Adding Category.. please wait',
      key: 'loading',
    });
    try {
      setConfirmLoading(true);
      const res = await axios.post(
        `${BASE_URL}/money/addCategory`,
        {
          type: addCategoryType.toLocaleLowerCase(),
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConfirmLoading(false);
      setCategoryModal(false);
      setReload(!reload);
      message.destroy('loading');
      message.success(res?.data?.message, 3);
      form.resetFields();
    } catch (error) {
      setConfirmLoading(false);
      setCategoryModal(false);
      message.destroy('loading');
      message.error(error?.response?.data?.message, 3);
    }
  };

  const deleteCategory = async (id) => {
    message.warning({
      content: 'Deleting Category.. please wait',
      key: 'loading',
    });
    try {
      const res = await axios.delete(`${BASE_URL}/money/deleteCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReload(!reload);
      setConfirmLoading(false);
      message.destroy('loading');
      message.success(res?.data?.message, 3);
    } catch (error) {
      setConfirmLoading(false);
      message.destroy('loading');
      message.error(error?.response?.data?.message, 3);
    }
  };

  const handleCancel = () => {
    setCategoryModal(false);
  };

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
          title={`Are you sure to delete-${props.name}`}
          onConfirm={() => {
            setConfirmLoading(true);
            deleteCategory(props.id);
          }}
          onCancel={() => true}
          okText='Delete'
          cancelText='Cancel'
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
        <LogOutButton />
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
                    <Button
                      type='primary'
                      onClick={() => {
                        addCategoryModal('Expense');
                      }}
                    >
                      Add Category
                    </Button>
                  </Divider>
                  <Divider orientation='left'>Expense Categories</Divider>
                  {data?.expenseCategories?.length > 0 ? <></> : <Empty />}
                </Skeleton>
              </CustomCard>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <CustomCard>
                <Skeleton loading={data ? false : true} active>
                  <Divider orientation='right'>
                    <Button
                      type='primary'
                      onClick={() => {
                        addCategoryModal('Income');
                      }}
                    >
                      Add Category
                    </Button>
                  </Divider>
                  <Divider orientation='left'>Income Categories</Divider>
                  {data?.incomeCategories?.length > 0 ? (
                    <React.Fragment>
                      {data?.incomeCategories?.map((item) => {
                        return (
                          <CategoryItem
                            key={item?.id}
                            id={item?.id}
                            type={item?.type[0]}
                            name={item?.name}
                          />
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    <Empty />
                  )}
                </Skeleton>
              </CustomCard>
            </Col>
          </Row>
        </React.Fragment>
      </div>
      <Modal
        title={`Add ${addCategoryType} Category`}
        visible={CategoryModal}
        onOk={addCategory}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name='Name'>
            <Input
              placeholder='Category Name'
              required
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default Profile;
