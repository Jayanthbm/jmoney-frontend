import React, { useContext, useState } from 'react';
import './login.css';
import { Form, Input, Button } from 'antd';
import { AuthContext } from '../context';
import { Link } from 'react-router-dom';
import { loginUser } from '../network/lib/auth';
function Login() {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
          onFinish={() => {
            setLoading(true);
            loginUser({
              email,
              password,
            })
              .then((response) => setToken(response.data.token))
              .finally(() => {
                setLoading(false);
              });
          }}
          onFinishFailed={() => true}
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
              disabled={loading}
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
