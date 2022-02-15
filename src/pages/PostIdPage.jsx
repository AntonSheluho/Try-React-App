import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

export default function PostIdPage() {

    const params = useParams();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const [fetchComments, isLoading2, error2] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id);
        setComments(response.data);
        console.log(comments);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, []);

  return (
    <div>
        <h1>Page with post's id = {params.id}</h1>
        {isLoading
            ?   <Loader/>
            :   <div>{post.id}. {post.title}</div>
        }
        <h2>Comments:</h2>
        {isLoading2
            ?   <Loader/>
            :   <div>
                    {comments.map((el, index) => 
                        <div key={index} style={{marginTop: '20px'}}>
                            <h3>{el.email}</h3>
                            <div >{el.body}</div>
                        </div>
                    )}
                </div>
        }
        
    </div>
  )
}
