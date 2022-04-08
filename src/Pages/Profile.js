import React, { useEffect, useState } from 'react';
import {
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
} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import CustomCard from '../Components/CustomCard';
import LogOutButton from '../Components/LogOutButton';
import CustomBreadcrumb from '../Components/CustomBreadcrumb';
import { getProfile } from '../network/lib/profile';
import { addCategory, deleteCategory } from '../network/lib/category';
function Profile() {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getProfile().then((response)=>setData(response.data));
  }, [reload]);

  const [addCategoryType, setAddCategoryType] = useState('Income');
  const [CategoryModal, setCategoryModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const addCategoryModal = (type) => {
    setAddCategoryType(type);
    setCategoryModal(true);
  };

  const newCategory = async () => {
    setConfirmLoading(true);
    addCategory({
      type: addCategoryType.toLocaleLowerCase(),
      name: categoryName,
    }).finally(function () {
      form.resetFields();
      setConfirmLoading(false);
      setCategoryModal(false);
      setReload(!reload);
    });
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
            deleteCategory(props.id).finally(() => setReload(!reload));
          }}
          onCancel={() => true}
          okText='Delete'
        >
          <DeleteTwoTone twoToneColor='red' />
        </Popconfirm>
      </span>
    );
  };

  return (
    <React.Fragment>
      <NavBar active={'profile'} />
      <CustomBreadcrumb title={'Profile'} />
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
                  {data?.expenseCategories?.length > 0 ? (
                    <React.Fragment>
                      {data?.expenseCategories?.map((item) => {
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
        onOk={newCategory}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setCategoryModal(false);
        }}
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
