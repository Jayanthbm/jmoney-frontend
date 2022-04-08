import React, { useEffect, useState } from 'react';
import {
  Skeleton,
  Empty,
  Row,
  Col,
  Divider,
  Statistic,
  Progress,
  Button,
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
import CustomCard from '../Components/CustomCard';
import CustomBreadcrumb from '../Components/CustomBreadcrumb';
import { getGoals, addGoal, editGoal, deleteGoal } from '../network/lib/goals';
const { Search } = Input;
function Goals() {
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getGoals(search)
      .then((response) => setUserGoals(response.data))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

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

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [goalId, setGoalId] = useState(null);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState(0);
  const [goalType, setGoalType] = useState('Add');
  const [goalModal, setGoalModal] = useState(false);

  return (
    <React.Fragment>
      <NavBar active={'goals'} />
      <CustomBreadcrumb title={'Goals'} />
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
                            deleteGoal(goal.id).finally(function () {
                              setReload(!reload);
                              setLoading(false);
                            });
                          }}
                          onCancel={() => true}
                          okText='Delete'
                        >
                          <Button
                            type='primary'
                            danger
                            size='small'
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
                          size='small'
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
            addGoal({
              name: goalName,
              totalAmount: parseFloat(goalAmount),
              savedAmount: parseFloat(savedAmount),
            }).finally(function () {
              setConfirmLoading(false);
              setGoalModal(false);
              setReload(!reload);
            });
          }
          if (goalType === 'Edit') {
            editGoal(goalId, {
              name: goalName,
              totalAmount: parseFloat(goalAmount),
              savedAmount: parseFloat(savedAmount),
            }).finally(function () {
              setConfirmLoading(false);
              setGoalModal(false);
              setReload(!reload);
            });
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
