
import React, {useState} from 'react';
import api from '../../api/api';

export default function PostForm({onPosted}){
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('description', desc);
    if (file) data.append('image', file);
    try{
      await api.post('/posts/', data, { headers: {'Content-Type':'multipart/form-data'} });
      setDesc(''); setFile(null);
      if(onPosted) onPosted();
    }catch(e){ console.error(e); }
  };

  return (
    <form onSubmit={submit}>
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What's on your mind?" />
      <input type="file" accept="image/*" onChange={(e)=> setFile(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
}
