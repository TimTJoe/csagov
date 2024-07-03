import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import { Routers } from './router.jsx';

import './index.css'
import "beercss"
import "material-dynamic-colors"
import Home from '@pages/home/index.js';
import SignupPage from '@pages/register/signup.page.jsx';
import Signin from '@pages/signin/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
