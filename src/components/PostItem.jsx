import React from 'react';
import MyButton from './UI/button/MyButton';
import { useLocation, useNavigate } from 'react-router-dom';

const PostItem = (props) => {
    const deleteItem = () => {
      props.remove(props.post)
    } 

    const router = useLocation();
    const navigate = useNavigate();

    function movePage() {
      navigate(`/posts/${props.post.id}`);
    }

    return (
        <div className="post">
        <div className="post__content">
          <strong>{props.post.id}. {props.post.title}</strong>
          <div>
            {props.post.body}
          </div>
        </div>
        <div className="post__btns">
          <MyButton onClick={movePage}>Open</MyButton>
          <MyButton onClick={deleteItem}>Delete</MyButton>
        </div>
      </div>
    );
}

export default PostItem;