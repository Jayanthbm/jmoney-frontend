import React from 'react';
import { Input, Form, DatePicker, TimePicker, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;
function TransactionForm(props) {
  const dateFormat = 'YYYY-MM-DD';
  const timeFormat = 'HH:mm:ss';
  return (
    <React.Fragment>
      <Form.Item label='Amount' style={{ display: 'block' }}>
        <Input
          type='number'
          className='form-control'
          id='amount'
          placeholder='Amount'
          value={props.amount}
          onChange={(e) => {
            props.setAmount(e.target.value);
          }}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item label='Description' style={{ display: 'block' }}>
        <Input
          type='text'
          className='form-control'
          id='goalName'
          placeholder='Description'
          value={props.description}
          onChange={(e) => {
            props.setDescription(e.target.value);
          }}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item label='Date' style={{ display: 'block' }}>
        <DatePicker
          onChange={props.onDateChange}
          defaultValue={moment(props.transactionDate, dateFormat)}
        />
        <TimePicker
          onChange={props.onTimeChange}
          defaultValue={moment(props.transactionDate, timeFormat)}
        />
      </Form.Item>
      <Form.Item label='Category' style={{ display: 'block' }}>
        <Select
          defaultValue={props.catgeoryId}
          style={{ width: 120 }}
          onChange={(value) => {
            props.onSelectChange(value);
          }}
        >
          <Option value='0'>Category</Option>
          {props.transactionType === 'income'
            ? props.incomeCategories.map((category) => (
                <Option value={category.id}>{category.name}</Option>
              ))
            : props.expenseCategories.map((category) => (
                <Option value={category.id}>{category.name}</Option>
              ))}
        </Select>
      </Form.Item>
    </React.Fragment>
  );
}

export default TransactionForm;
