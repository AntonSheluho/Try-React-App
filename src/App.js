import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/Context";
import './styles/App.css'

export default function App() {

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
      if(sessionStorage.getItem('auth')) {
        setIsAuth(true)
      }
    }, []);

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


