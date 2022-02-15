import React, { useContext } from 'react';
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from '../context/Context';
import '../styles/App.css'
import MyButton from './UI/button/MyButton';

export default function Container() {

  const {isAuth, setIsAuth} = useContext(AuthContext)

  function exit(e) {
    setIsAuth(false)
    logout()
  }

  function logout() {
    setIsAuth(false)
    sessionStorage.removeItem('auth')
  }

  return (
    isAuth
      ? <>
        
         <header className='navbar'>
            <MyButton onClick={exit} style={{background: 'white'}}>Exit</MyButton>
            <div>
              <Link className='link' to="/about" >About us</Link>
              <Link className='link' to="/posts" >Posts</Link>
            </div>
          </header>

          <Outlet/>

          <footer className='navbar' style={{color: 'white'}}>2022</footer>
        </>
      : <>
        
          <header className='navbar'></header>

          <Outlet/>

          <footer className='navbar' style={{color: 'white'}}>2022</footer>
      </>
  )
}   
