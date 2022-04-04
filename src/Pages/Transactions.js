import React, { useEffect, useState, useContext } from 'react';
import {
  Breadcrumb,
  Skeleton,
  Empty,
  Button,
  message,
  Select,
  Modal,
} from 'antd';
import NavBar from '../Components/NavBar';
import LogOutButton from '../Components/LogOutButton';
import { AuthContext } from '../context';
import { BASE_URL } from '../constants';
import axios from 'axios';
import TransactionCard from '../Components/TransactionCard';
import TransactionForm from '../Components/TransactionForm';
import moment from 'moment';
const { Option } = Select;
function Transactions() {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [transactionType, setTransactionType] = useState('all');
  const [categoryId, setCategoryId] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  useEffect(() => {
    message.info({
      content: 'loading data..',
      key: 'loading',
    });
    async function fetchData() {
      let url = `${BASE_URL}/money/transactions?page=1`;
      if (transactionType !== 'all') {
        url += `&type=${transactionType}`;
      }
      if (categoryId > 0) {
        url += `&categoryId=${categoryId}`;
      }
      if (year > 0) {
        url += `&year=${year}`;
      }
      if (month > 0) {
        url += `&month=${month}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.meta.totalPages > response.data.meta.currentPage) {
        setShowLoadMore(true);
      } else {
        setShowLoadMore(false);
      }
      setTransactions(response.data.items);
      setLoading(false);
    }
    fetchData();
  }, [token, transactionType, categoryId, year, month, reload]);

  const [categories, setCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await axios.get(`${BASE_URL}/money/getCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.categories);
      setIncomeCategories(response.data.incomeCategories);
      setExpenseCategories(response.data.expenseCategories);
    }
    getCategories();
  }, [token]);

  useEffect(() => {
    function removeMessage() {
      message.destroy('loading');
    }
    if (loading === false) {
      removeMessage();
    }
  }, [loading]);

  useEffect(() => {
    message.info({
      content: 'loading data..',
      key: 'loading',
    });
    async function updateData() {
      let url = `${BASE_URL}/money/transactions?page=1`;
      if (transactionType !== 'all') {
        url += `&type=${transactionType}`;
      }
      if (categoryId > 0) {
        url += `&categoryId=${categoryId}`;
      }
      if (year > 0) {
        url += `&year=${year}`;
      }
      if (month > 0) {
        url += `&month=${month}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.meta.totalPages > response.data.meta.currentPage) {
        setShowLoadMore(true);
      } else {
        setShowLoadMore(false);
      }
      setTransactions([...transactions, ...response.data.items]);
      message.destroy('loading');
      message.success({
        content: 'data loaded',
        key: 'loaded',
      });
    }
    if (page > 1) {
      updateData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token]);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [transactionId, setTransactionId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('Add');
  const [newTransactionType, setNewTransactionType] = useState('expense');
  const [description, setDescription] = useState('');
  const [newCategoryId, setNewCategoryId] = useState(0);
  const [transactionModal, setTransactionModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [transactionDate, setTransactionDate] = useState(new Date());

  const addTransaction = async () => {
    message.info({
      content: 'Adding Transaction.. please wait',
      key: 'loading',
    });
    try {
      setConfirmLoading(true);
      const res = await axios.post(
        `${BASE_URL}/money/addTransaction`,
        {
          description: description,
          amount: parseFloat(amount),
          date: transactionDate,
          type: newTransactionType,
          categoryId: newCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConfirmLoading(false);
      setTransactionModal(false);
      setReload(!reload);
      setLoading(false);
      message.destroy('loading');
      message.success(res?.data?.message, 3);
    } catch (error) {
      setConfirmLoading(false);
      setTransactionModal(false);
      setLoading(false);
      message.destroy('loading');
      message.error(error?.response?.data?.message, 3);
    }
  };

  const updateTransaction = async () => {
    message.info({
      content: 'Updating Transaction.. please wait',
      key: 'loading',
    });
    try {
      setConfirmLoading(true);
      const res = await axios.put(
        `${BASE_URL}/money/updateTransaction/${transactionId}`,
        {
          description: description,
          amount: parseFloat(amount),
          date: transactionDate,
          type: newTransactionType,
          categoryId: newCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConfirmLoading(false);
      setTransactionModal(false);
      setReload(!reload);
      setLoading(false);
      message.destroy('loading');
      message.success(res?.data?.message, 3);
    } catch (error) {
      setConfirmLoading(false);
      setTransactionModal(false);
      setLoading(false);
      message.destroy('loading');
      message.error(error?.response?.data?.message, 3);
    }
  };

  const deleteTransaction = async (transactionId) => {
    message.warning({
      content: 'Deleting Transaction.. please wait',
      key: 'loading',
    });
    try {
      const res = await axios.delete(
        `${BASE_URL}/money/deleteTransaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  function onDateChange(date, dateString) {
    setSelectedDate(dateString);
    setTransactionDate(dateString);
  }

  function onTimeChange(date, timeString) {
    setSelectedTime(timeString);
    setTransactionDate(`${selectedDate} ${timeString}`);
  }

  return (
    <React.Fragment>
      <NavBar active={'transactions'} />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Transactions</Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-content'>
        <LogOutButton>
          <Button
            type='primary'
            style={{
              borderRadius: 5,
              marginLeft: 3,
              background: '#52c41a',
              borderColor: '#52c41a',
            }}
            disabled={loading}
            onClick={() => {
              setTransactionModal(true);
              setAmount(0);
              setType('Add');
              setDescription('');
              setTransactionDate(new Date());
              setNewTransactionType('income');
              setNewCategoryId(0);
            }}
          >
            Add Income
          </Button>
          <Button
            type='primary'
            style={{
              borderRadius: 5,
              marginLeft: 3,
              background: '#f58c22',
              borderColor: '#f58c22',
            }}
            onClick={() => {
              setTransactionModal(true);
              setAmount(0);
              setType('Add');
              setDescription('');
              setTransactionDate(new Date());
              setNewTransactionType('expense');
            }}
            disabled={loading}
          >
            Add Expense
          </Button>
        </LogOutButton>
        {loading ? (
          <Skeleton active />
        ) : (
          <React.Fragment>
            <br />
            <React.Fragment>
              <Select
                defaultValue='all'
                style={{ width: 120 }}
                onChange={(value) => setTransactionType(value)}
              >
                <Option value='all'>Income/Expense</Option>
                <Option value='income'>Income</Option>
                <Option value='expense'>Expense</Option>
              </Select>
              <Select
                defaultValue='0'
                style={{ width: 120 }}
                onChange={(value) => setCategoryId(value)}
              >
                <Option value='0'>All Categories</Option>
                {transactionType === 'income'
                  ? incomeCategories.map((category) => (
                      <Option value={category.id}>{category.name}</Option>
                    ))
                  : transactionType === 'expense'
                  ? expenseCategories.map((category) => (
                      <Option value={category.id}>{category.name}</Option>
                    ))
                  : categories.map((category) => (
                      <Option value={category.id}>{category.name}</Option>
                    ))}
              </Select>
              <Select
                defaultValue='0'
                style={{ width: 120 }}
                onChange={(value) => setMonth(value)}
              >
                <Option value='0'>All Months</Option>
                {[...Array(12).keys()].map((month) => (
                  <Option value={month + 1}>{monthNames[month]}</Option>
                ))}
              </Select>
              <Select
                defaultValue='0'
                style={{ width: 120 }}
                onChange={(value) => setYear(value)}
              >
                <Option value='0'>Any Year</Option>
                <Option value='2022'>2022</Option>
                <Option value='2021'>2021</Option>
                <Option value='2020'>2020</Option>
              </Select>
            </React.Fragment>

            {transactions?.length > 0 ? (
              <React.Fragment>
                {transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    onEdit={() => {
                      setSelectedDate(
                        moment(transaction.date).format('YYYY-MM-DD')
                      );
                      setSelectedTime(
                        moment(transaction.date).format('HH:mm:ss')
                      );
                      setTransactionModal(true);
                      setAmount(transaction.amount);
                      setDescription(transaction.description);
                      setTransactionDate(
                        moment(transaction.date).format('YYYY-MM-DD HH:mm:ss')
                      );
                      setTransactionId(transaction.id);
                      setNewTransactionType(transaction.type[0]);
                      setNewCategoryId(transaction?.category?.id);
                      setType('Edit');
                    }}
                    onDelete={() => {
                      deleteTransaction(transaction.id);
                    }}
                    transaction={transaction}
                  />
                ))}
                {showLoadMore && (
                  <Button
                    type='primary'
                    style={{
                      borderRadius: 5,
                      marginLeft: 3,
                      background: '#52c41a',
                      borderColor: '#52c41a',
                      alignSelf: 'center',
                    }}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                    disabled={loading}
                  >
                    Load More
                  </Button>
                )}
              </React.Fragment>
            ) : (
              <Empty />
            )}
          </React.Fragment>
        )}
      </div>
      <Modal
        title={`${type} Transaction (${newTransactionType.toUpperCase()})`}
        visible={transactionModal}
        onOk={async () => {
          if (type === 'Add') {
            await addTransaction();
          }
          if (type === 'Edit') {
            await updateTransaction();
          }
        }}
        confirmLoading={confirmLoading}
        onCancel={() => setTransactionModal(false)}
      >
        <TransactionForm
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          transactionDate={transactionDate}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          transactionType={newTransactionType}
          catgeoryId={newCategoryId}
          onSelectChange={setNewCategoryId}
        />
        {/* <GoalForm
          goalName={goalName}
          goalAmount={goalAmount}
          savedAmount={savedAmount}
          setGoalName={setGoalName}
          setGoalAmount={setGoalAmount}
          setSavedAmount={setSavedAmount}
        /> */}
      </Modal>
    </React.Fragment>
  );
}

export default Transactions;
