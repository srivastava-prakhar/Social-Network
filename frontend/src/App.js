
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
