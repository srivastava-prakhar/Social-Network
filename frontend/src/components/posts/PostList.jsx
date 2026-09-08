
import React, {useEffect, useState} from 'react';
import api from '../../api/api';

export default function PostList(){
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await api.get('/posts/');
    setPosts(res.data);
  };
  useEffect(()=> { fetchPosts(); }, []);

  const toggleLike = async (id) => {
    await api.post(`/posts/${id}/like/`);
    fetchPosts();
  };
  const toggleDislike = async (id) => {
    await api.post(`/posts/${id}/dislike/`);
    fetchPosts();
  };

  return (
    <div>
      {posts.map(p => (
        <div key={p.id}>
          <p>{p.user}</p>
          {p.image && <img src={`http://localhost:8000${p.image}`} alt="" width="300" />}
          <p>{p.description}</p>
          <p>Likes: {p.like_count} Dislikes: {p.dislike_count}</p>
          <button onClick={()=> toggleLike(p.id)}>Like</button>
          <button onClick={()=> toggleDislike(p.id)}>Dislike</button>
        </div>
      ))}
    </div>
  );
}
