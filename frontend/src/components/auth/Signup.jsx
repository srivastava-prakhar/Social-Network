
import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({full_name:'', email:'', password:'', re_password:'', dob:''});
  const [file, setFile] = useState(null);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const handleFile = e => setFile(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('full_name', form.full_name);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('re_password', form.re_password);
    data.append('dob', form.dob);
    if (file) data.append('profile_pic', file);

    try{
      await api.post('/accounts/signup/', data, { headers: {'Content-Type':'multipart/form-data'} });
      alert('Signup success! Please login.');
      navigate('/login');
    }catch(err){
      console.error(err);
      alert(JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Sign Up</h2>
      <input name="full_name" placeholder="Full name" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="dob" placeholder="YYYY-MM-DD" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="re_password" type="password" placeholder="Confirm password" onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handleFile} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
