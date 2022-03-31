import React, { useEffect, useState, useContext } from 'react';
import { Breadcrumb, Statistic, Row, Col, Progress, PageHeader } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import NavBar from '../Components/NavBar';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { AuthContext } from '../context';
function Dashboard() {
  const [data, setData] = useState();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${BASE_URL}/money/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
    }
    fetchData();
  }, [token]);

  const IncomeExpenseCards = (props) => {
    return (
      <React.Fragment>
        <Statistic title={props.title} value={props.total} />
        <div style={{ width: 170 }}>
          <h4>Compared to Last Month</h4>
          {props.percentageValue > 0 ? (
            <Row>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Statistic
                  title=''
                  value={props.percentageValue}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix='%'
                />
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Statistic
                  title=''
                  value={props.money}
                  prefix={<MoneyCollectOutlined />}
                />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Statistic
                  title=''
                  value={props.percentageValue}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix='%'
                />
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                <Statistic
                  title=''
                  value={props.money}
                  prefix={<MoneyCollectOutlined />}
                />
              </Col>
            </Row>
          )}
        </div>
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <NavBar active={'dashboard'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <PageHeader
          className='site-page-header'
          title={`Data for the ${data?.month}- ${data?.year}`}
          subTitle={`(${data?.startDate} - ${data?.endDate})`}
        />
        <Row>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <IncomeExpenseCards
              title='Total Income'
              total={data?.monthsTotalIncome?.total}
              money={data?.monthsTotalIncome?.comparedToLastMonthInMoney}
              percentageValue={
                data?.monthsTotalIncome?.comparedToLastMonthInPercent
              }
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <IncomeExpenseCards
              title='Total Expense'
              total={data?.monthsTotalExpense?.total}
              money={data?.monthsTotalExpense?.comparedToLastMonthInMoney}
              percentageValue={
                data?.monthsTotalExpense?.comparedToLastMonthInPercent
              }
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
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

            <Statistic
              title='Remaining'
              value={data?.dailyLimit?.remaingForTheeDay}
              suffix={'/' + data?.dailyLimit?.total}
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Statistic
              title='Available Balance'
              value={data?.availableBalance?.total}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
