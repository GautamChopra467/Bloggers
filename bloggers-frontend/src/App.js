import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './modules/Home/Home';
import SignUp from './modules/SignUp/SignUp';
import Login from './modules/Login/Login';
import Sidebar from './shared/widgets/Sidebar/Sidebar';
import Blog from './modules/Blog/Blog';

const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/:id' element={<Sidebar />} />
        <Route path='/blog/:user_id/:blog_id' element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
