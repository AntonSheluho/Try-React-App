import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

export default function PostForm({create}) {
    const [post, setPost] = useState({title: '', body: ''})
    
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {...post, id: Date.now()};
        create(newPost)
        setPost({title: '', body: ''});
    }


  return (
    <form>
        <MyInput 
          type="text" 
          placeholder="Название поста"
          onChange={e => setPost({...post, title: e.target.value})}
          value={post.title} 
        />
        <MyInput
          type="text" 
          placeholder="Описание поста" 
          value={post.body} 
          onChange={e => setPost({...post, body: e.target.value})}
        />
        <MyButton onClick={addNewPost} >Создать пост</MyButton>
      </form>
  )
}
