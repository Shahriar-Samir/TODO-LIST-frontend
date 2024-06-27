import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import {HelmetProvider} from 'react-helmet-async'
import AuthProvider from './Providers/AuthProvider.jsx'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HelmetProvider>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      </HelmetProvider>
  </React.StrictMode>,
)
