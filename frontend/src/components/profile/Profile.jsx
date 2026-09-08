
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import PostForm from '../posts/PostForm';
import PostList from '../posts/PostList';

export default function Profile(){
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const res = await api.get('/accounts/profile/');
    setUser(res.data);
  };

  useEffect(()=> { fetchProfile(); }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.full_name}</h2>
      <img src={user.profile_pic ? `http://localhost:8000${user.profile_pic}` : '/default.png'} alt="profile" width="120" />
      <p>{user.email}</p>
      <p>DOB: {user.dob}</p>

      <h3>Add Post</h3>
      <PostForm onPosted={() => { /* refresh posts */ }} />

      <h3>Feed</h3>
      <PostList />
    </div>
  );
}
