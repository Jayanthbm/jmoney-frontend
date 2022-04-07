import React, { useEffect, useState, useContext } from 'react';
import {
  Statistic,
  Row,
  Col,
  PageHeader,
  Skeleton,
  Divider,
  message,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { AuthContext } from '../context';
import CustomCard from '../Components/CustomCard';
import LogOutButton from '../Components/LogOutButton';
import CustomBreadcrumb from '../Components/CustomBreadcrumb';
function Dashboard() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    message.info({
      content: 'loading data..',
      key: 'loading',
    });
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/money/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setLoading(false);
    }
    fetchData();
  }, [token]);

  const IncomeExpenseCards = (props) => {
    return (
      <React.Fragment>
        <Statistic title={props.title} value={props.total} />
        <div style={{ width: 170 }}>
          <Divider />
          <span
            style={{
              color: '#000000',
              opacity: 0.4,
              fontSize: '14px',
              marginBottom: '4px',
            }}
          >
            Compared to Last Month
          </span>
          {props.percentageValue > 0 ? (
            <Row>
              <Col span={24}>
                <Statistic
                  title=''
                  value={props.money}
                  prefix={<MoneyCollectOutlined />}
                />
                <Statistic
                  title=''
                  value={props.percentageValue}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix='%'
                />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col span={24}>
                <Statistic
                  title=''
                  value={props.money}
                  prefix={<MoneyCollectOutlined />}
                />
                <Statistic
                  title=''
                  value={props.percentageValue}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix='%'
                />
              </Col>
            </Row>
          )}
        </div>
      </React.Fragment>
    );
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
      <NavBar active={'dashboard'} />
      <CustomBreadcrumb title={'Dashboard'} />
      <div className='site-layout-content'>
        <LogOutButton />
        {data && (
          <PageHeader
            className='site-page-header'
            title={`Data for ${data?.month}- ${data?.year}`}
            subTitle={`(${data?.startDate} - ${data?.endDate})`}
          />
        )}

        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <CustomCard>
              <Skeleton loading={data ? false : true} active>
                <IncomeExpenseCards
                  title='Total Income'
                  total={data?.monthsTotalIncome?.total}
                  money={data?.monthsTotalIncome?.comparedToLastMonthInMoney}
                  percentageValue={
                    data?.monthsTotalIncome?.comparedToLastMonthInPercent
                  }
                />
              </Skeleton>
            </CustomCard>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <CustomCard>
              <Skeleton loading={data ? false : true} active>
                <IncomeExpenseCards
                  title='Total Expense'
                  total={data?.monthsTotalExpense?.total}
                  money={data?.monthsTotalExpense?.comparedToLastMonthInMoney}
                  percentageValue={
                    data?.monthsTotalExpense?.comparedToLastMonthInPercent
                  }
                />
              </Skeleton>
            </CustomCard>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <CustomCard>
              <Skeleton loading={data ? false : true} active>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title='Daily Limit'
                      value={data?.dailyLimit?.total}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title='Spent Today'
                      value={data?.dailyLimit?.spentToday}
                    />
                  </Col>
                </Row>
                <Divider />
                <Statistic
                  title='Remaining'
                  value={data?.dailyLimit?.remaingForTheeDay}
                  suffix={'/' + data?.dailyLimit?.total}
                />
              </Skeleton>
            </CustomCard>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={6}>
            <CustomCard>
              <Skeleton loading={data ? false : true} active>
                <Statistic
                  title='Available Balance'
                  value={data?.availableBalance?.total}
                />
                <Divider />
              </Skeleton>
            </CustomCard>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
