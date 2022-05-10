import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavigationBar from './Components/NavigationBar';
import { Counter } from './features/counter/Counter';
import Login from './features/profile/Login'
import Register from './features/profile/Register'

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>

      <Routes>
        <Route index path="/" element={<> </>}/>
        <Route index path="/login" element={<Login/>}/>
        <Route index path="/register" element={<Register/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
