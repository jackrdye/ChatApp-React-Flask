import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavigationBar from './Components/NavigationBar';
import Chat from './features/chat/Chat';
import { Counter } from './features/counter/Counter';
import Discussion from './features/discussion/Discussion';
import Login from './features/profile/Login'
import Register from './features/profile/Register'
import Resources from './features/resources/Resources'

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>

      <Routes>
        <Route index path="/" element={<></>}/>
        <Route index path="/login" element={<Login/>}/>
        <Route index path="/register" element={<Register/>}/>
        <Route index path="/discussion" element={<Discussion/>}/>
        <Route index path="/chat" element={<Chat/>}/>
        <Route index path="/resources" element={<Resources/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
