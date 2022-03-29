import React, { useContext, useState } from 'react';
import './login.css';
import { Form, Input, Button, notification } from 'antd';
import { AuthContext } from '../context';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { Link } from 'react-router-dom';
function Login() {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message ? message : '',
      description: description ? description : null,
    });
  };
  const login = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
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
            alt='Login'
          />
        </div>
        <Form
          name='login-form'
          onFinish={login}
          onFinishFailed={() => {
            console.log('failed');
          }}
        >
          <p className='form-title'>Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name='username'
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

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              LOGIN
            </Button>
          </Form.Item>
          <Link to='/register'> Don't have an account?</Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
