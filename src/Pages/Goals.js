import React, { useEffect, useState, useContext } from 'react';
import {
  Breadcrumb,
  Skeleton,
  Empty,
  Row,
  Col,
  Divider,
  Statistic,
  Progress,
  Button,
  message,
  Popconfirm,
  Modal,
  Input,
} from 'antd';
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import LogOutButton from '../Components/LogOutButton';
import GoalForm from '../Components/GoalForm';
import { AuthContext } from '../context';
import { BASE_URL } from '../constants';
import axios from 'axios';
import CustomCard from '../Components/CustomCard';
const { Search } = Input;
function Goals() {
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const { token } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  useEffect(() => {
    message.info({
      content: 'loading data..',
      key: 'loading',
    });
    async function fetchData() {
      let url = `${BASE_URL}/money/user-goals`;
      if (search?.length > 0) {
        url += `?search=${search}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserGoals(response.data);
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, reload]);

  const getStrokeColor = (percentage) => {
    if (percentage >= 100) {
      return '#52c41a';
    } else if (percentage >= 80) {
      return '#22c7f5';
    } else if (percentage >= 60) {
      return '#f58c22';
    } else if (percentage >= 40) {
      return '#f5c722';
    } else if (percentage >= 20) {
      return '#fa8c16';
    } else {
      return '#f5222d';
    }
  };

  const deleteGoal = async (id) => {
    message.warning({
      content: 'Deleting Goal.. please wait',
      key: 'loading',
    });
    try {
      const res = await axios.delete(`${BASE_URL}/money/deleteUserGoal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReload(!reload);

      setLoading(false);
      message.destroy('loading');
      message.success(res?.data?.message, 3);
    } catch (error) {
      setLoading(false);
      message.destroy('loading');
      message.error(error?.response?.data?.message, 3);
    }
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [goalId, setGoalId] = useState(null);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState(0);
  const [goalType, setGoalType] = useState('Add');
  const [goalModal, setGoalModal] = useState(false);

  const addGoal = async () => {
    message.info({
      content: 'Adding Goal.. please wait',
      key: 'loading',
    });
    try {
      setConfirmLoading(true);
      const res = await axios.post(
        `${BASE_URL}/money/addUserGoal`,
        {
          name: goalName,
          totalAmount: parseFloat(goalAmount),
          savedAmount: parseFloat(savedAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConfirmLoading(false);
      setGoalModal(false);
      setReload(!reload);
      setLoading(false);
      message.destroy('loading');
      message.success(res?.data?.message, 3);
    } catch (error) {
      setConfirmLoading(false);
      setGoalModal(false);
      setLoading(false);
      message.destroy('loading');
      message.error(error?.response?.data?.message, 3);
    }
  };

  const updateGoal = async () => {
    message.info({
      content: 'Updating Goal.. please wait',
      key: 'loading',
    });
    try {
      setConfirmLoading(true);
      const res = await axios.put(
        `${BASE_URL}/money/updateUserGoal/${goalId}`,
        {
          name: goalName,
          totalAmount: parseFloat(goalAmount),
          savedAmount: parseFloat(savedAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConfirmLoading(false);
      setGoalModal(false);
      setReload(!reload);
      setLoading(false);
      message.destroy('loading');
      message.success(res?.data?.message, 3);
    } catch (error) {
      setConfirmLoading(false);
      setGoalModal(false);
      setLoading(false);
      message.destroy('loading');
      message.error(error?.response?.data?.message, 3);
    }
  };

  useEffect(() => {
    function removeMessage() {
      message.destroy('loading');
    }
    if (loading === false) {
      removeMessage();
    }
  }, [loading]);

  return (
    <React.Fragment>
      <NavBar active={'goals'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Goals</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <LogOutButton>
          <Button
            type='primary'
            style={{ borderRadius: 5 }}
            onClick={() => {
              setGoalModal(true);
              setGoalName('');
              setGoalAmount('');
              setSavedAmount(0);
              setGoalType('Add');
            }}
            icon={<AppstoreAddOutlined />}
          >
            Add New Goal
          </Button>
        </LogOutButton>
        <div style={{ marginTop: 10, marginBottom: 5, marginLeft: 10 }}>
          <Row>
            <Col>
              <Search
                placeholder='Search Goals'
                enterButton='Search'
                size='large'
                loading={loading}
                allowClear={true}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={() => setReload(!reload)}
                onPressEnter={() => setReload(!reload)}
              />
            </Col>
          </Row>
        </div>

        {loading ? (
          <Skeleton loading active />
        ) : (
          <React.Fragment>
            {userGoals?.length > 0 ? (
              <React.Fragment>
                <Row>
                  {userGoals.map((goal) => (
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                      <CustomCard key={goal.id}>
                        <Divider orientation='left'>{goal.name}</Divider>
                        <Row>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Statistic
                              title='Total Amount'
                              value={goal.totalAmount}
                              prefix={'₹'}
                            />
                          </Col>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Statistic
                              title='Pending Amount'
                              value={goal.pendingAmount}
                              prefix={'₹'}
                            />
                          </Col>
                        </Row>
                        <Progress
                          percent={goal.percentageCompleted}
                          size='small'
                          showInfo={false}
                          strokeColor={getStrokeColor(goal.percentageCompleted)}
                        />
                        <Row>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Statistic
                              title='Saved Amount'
                              value={goal.savedAmount}
                              prefix={'₹'}
                            />
                          </Col>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Statistic
                              title='Progress'
                              value={goal.percentageCompleted}
                              valueStyle={{
                                color: getStrokeColor(goal.percentageCompleted),
                              }}
                              suffix='%'
                            />
                          </Col>
                        </Row>
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                          }}
                        >
                          <Popconfirm
                            title={'Are you sure you want to delete this goal?'}
                            onConfirm={() => {
                              setLoading(true);
                              deleteGoal(goal.id);
                            }}
                            onCancel={() => true}
                            okText='Delete'
                            cancelText='Cancel'
                          >
                            <Button
                              type='primary'
                              danger
                              style={{ margin: 2 }}
                              onClick={() => true}
                              icon={<DeleteOutlined />}
                            >
                              Delete
                            </Button>
                          </Popconfirm>

                          <Button
                            type='primary'
                            style={{ margin: 2 }}
                            onClick={() => {
                              setGoalModal(true);
                              setGoalType('Edit');
                              setGoalId(goal.id);
                              setGoalName(goal.name);
                              setGoalAmount(goal.totalAmount);
                              setSavedAmount(goal.savedAmount);
                            }}
                            icon={<EditOutlined />}
                          >
                            Edit
                          </Button>
                        </div>
                      </CustomCard>
                    </Col>
                  ))}
                </Row>
              </React.Fragment>
            ) : (
              <Empty />
            )}
          </React.Fragment>
        )}
      </div>
      <Modal
        title={`${goalType} Goal`}
        visible={goalModal}
        onOk={async () => {
          if (goalType === 'Add') {
            await addGoal();
          }
          if (goalType === 'Edit') {
            await updateGoal();
          }
        }}
        confirmLoading={confirmLoading}
        onCancel={() => setGoalModal(false)}
      >
        <GoalForm
          goalName={goalName}
          goalAmount={goalAmount}
          savedAmount={savedAmount}
          setGoalName={setGoalName}
          setGoalAmount={setGoalAmount}
          setSavedAmount={setSavedAmount}
        />
      </Modal>
    </React.Fragment>
  );
}

export default Goals;
