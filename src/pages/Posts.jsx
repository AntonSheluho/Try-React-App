import React, { useState, useEffect, useRef } from "react";
import PostService from "../API/PostService";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import MyModal from "../components/UI/myModal/MyModal";
import { usePosts } from "../hooks/usePost";
import '../styles/App.css'
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''})

  const [modal, setModal] = useState(false)

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10)  
  const [page, setPage] = useState(1)  

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef()
  const observer = useRef()
  

  const [fetchPost, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useEffect(() => {
    if (isPostsLoading) return;
    if (observer.current) observer.current.disconnect();
    var callback = function(entries, observer) {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(page + 1)
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current)
  }, [isPostsLoading])

  useEffect(() => {fetchPost(limit, page)}, [page])

  function changePage(page) {
    setPage(page)
    fetchPost(limit, page)
  }

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false)
  };

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  };



  return (
      <div className="App">
          <MyButton onClick={() => setModal(true)}>Создать новый пост</MyButton>
          <MyModal visible={modal} setVisible={setModal} >
              <PostForm create={createPost} />
          </MyModal>
          <hr style={{margin: '15px 0'}}/>
          <PostFilter filter={filter} setFilter={setFilter} />
          {postError &&
            <h1 style={{textAlign: 'center', margin: '20px 0'}}>Error ${postError}</h1>
          }
          <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов 1'} />
          <div ref={lastElement} style={{height: 20, backgroundColor: 'red'}}></div>
          {isPostsLoading &&
            <Loader/>
          }
          <Pagination page={page} changePage={changePage} totalPages={totalPages} />
          <br/><br/>
         
      </div>
  );
}

export default Posts;
