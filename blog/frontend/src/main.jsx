import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter, Outlet } from "react-router-dom";
import { Routers } from './router.jsx';

import './index.css'
import "beercss"
import "material-dynamic-colors"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Routers} />
    <Outlet />
  </React.StrictMode>,
)
