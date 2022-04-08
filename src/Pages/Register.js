import React, { useState } from 'react';
import './login.css';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../network/lib/auth';
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

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
          onFinish={() => {
            setLoading(true);
            registerUser({
              name,
              email,
              password,
              phone,
            })
              .then(() => navigate('/login'))
              .finally(() => setLoading(false));
          }}
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
              disabled={loading}
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
