import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import Goals from './Pages/Goals';
import Insights from './Pages/Insights';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Transactions from './Pages/Transactions';
import { useState } from 'react';

const App = () => {
  const [user] = useState(false);
  return (
    <Routes>
      <Route
        path='/'
        element={<Navigate to={user ? '/dashboard' : '/login'} />}
      />
      {user ? (
        <>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/goals' element={<Goals />} />
          <Route path='/insights' element={<Insights />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/profile' element={<Profile />} />
        </>
      ) : (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </>
      )}
      <Route
        path='*'
        element={<Navigate to={user ? '/dashboard' : '/login'} />}
      />
    </Routes>
  );
};
export default App;
