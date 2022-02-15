import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/Context'
import About from '../pages/About'
import Error from '../pages/Error'
import Login from '../pages/Login'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'
import { privateRouter, publicRouter } from '../router'
import Container from './Container'

export default function AppRouter() {

    const {isAuth, setIsAuth} = useContext(AuthContext);
    console.log(isAuth)

  return (
    isAuth
      ?<Routes>
        <Route path="/" element={<Container/>} >
          <Route index element={<About/>} />
          {privateRouter.map(r => 
            <Route key={r.component} path={r.path} element={r.component} />
          )}
          <Route path="*" element={<About/>} />
        </Route>
      </Routes>
      :<Routes>
        <Route path="/" element={<Container/>} >
          <Route index element={<Login/>} />      
          {publicRouter.map(r => 
            <Route key={r.component} path={r.path} element={r.component} />
          )}     
          <Route path="*" element={<Login/>} />
        </Route>
      </Routes>
  )
}
