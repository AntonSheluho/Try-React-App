import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context/Context';

export default function Login() {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    function submit(e) {
        e.preventDefault();
        setIsAuth(true)
        sessionStorage.setItem('auth', 'true')
    }

  return (
    <div>
        <h1>Page for Login</h1>
        <form onSubmit={submit}>
            <MyInput text="text" placeholder="Enter login" />
            <MyInput text="password" placeholder="Enter password" />
            <MyButton>Sing up</MyButton>
        </form>
    </div>
  )
}
