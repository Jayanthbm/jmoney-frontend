import React from 'react';
import { Input, Form } from 'antd';
function GoalForm(props) {
  return (
    <React.Fragment>
      <Form.Item label='Goal Amount' style={{ display: 'block' }}>
        <Input
          type='text'
          className='form-control'
          id='goalName'
          placeholder='Enter Goal Name'
          value={props.goalName}
          onChange={(e) => {
            props.setGoalName(e.target.value);
          }}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item label='Goal Amount' style={{ display: 'block' }}>
        <Input
          type='number'
          className='form-control'
          id='goalAmount'
          placeholder='Enter Goal Amount'
          value={props.goalAmount}
          onChange={(e) => {
            props.setGoalAmount(e.target.value);
          }}
          allowClear={true}
        />
      </Form.Item>

      <Form.Item label='Saved Amount' style={{ display: 'block' }}>
        <Input
          type='number'
          className='form-control'
          id='savedAmount'
          placeholder='Enter Saved Amount'
          value={props.savedAmount}
          onChange={(e) => {
            props.setSavedAmount(e.target.value);
          }}
          allowClear={true}
        />
      </Form.Item>
    </React.Fragment>
  );
}

export default GoalForm;
