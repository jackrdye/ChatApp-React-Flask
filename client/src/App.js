import React, {useState, useEffect} from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import Navigation from './Components/Navigation';
import Home from "./Pages/Home.js"
import Login from "./Pages/Login.js"
import Register from "./Pages/Register.js"
import Messages from "./Pages/Messages.js"

export const SessionContext = React.createContext({
  "sessionKey": "", 
  "setSessionKey": () => {}
})


function App() {
  const [sessionKey, setSessionKey] = useState("")
  const value = { sessionKey, setSessionKey }


  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        {/* <SessionContext.Provider value={value}> */}
          <Route index element={<Home/>} />
          <Route path="home" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />      
          <Route path="/messages" element={<Messages/>} />
        {/* </SessionContext.Provider> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
