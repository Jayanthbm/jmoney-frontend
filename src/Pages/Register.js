import React, { useState } from 'react';
import './login.css';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message ? message : '',
      description: description ? description : null,
    });
  };

  const register = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
        phone,
      });
      console.log(res.data);
      openNotificationWithIcon('success', res.data.type, res.data.message);
      navigate('/login');
    } catch (error) {
      console.log(error?.response?.data?.message);
      openNotificationWithIcon(
        'error',
        error?.response?.data?.type,
        error.response.data.message
      );
    }
  };
  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='illustration-wrapper'>
          <img
            src='https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700'
            alt='Regsiter'
          />
        </div>
        <Form
          name='login-form'
          onFinish={register}
          onFinishFailed={() => {
            console.log('failed');
          }}
        >
          <p className='form-title'>Register</p>
          <p>Explore the things</p>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              placeholder='Name'
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              placeholder='Email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              placeholder='Password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item name='mobile'>
            <Input
              placeholder='Mobie'
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Register
            </Button>
          </Form.Item>
          <Link to='/login'>Already have an account? </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
