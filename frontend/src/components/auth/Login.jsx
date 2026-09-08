
import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({email:'', password:''});

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.post('/accounts/login/', form);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/profile');
    }catch(err){
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required/>
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required/>
      <button type="submit">Login</button>
    </form>
  );
}
