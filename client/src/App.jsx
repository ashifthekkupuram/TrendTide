import React from 'react'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

import './App.css'

import { Home, Login, SignUp, ResetPassword, ResetConfirmPassword, VerifyAccount } from './pages'
import AuthWrapper from './components/AuthWrapper.jsx'
import AuthRedirect from './components/AuthRedirect.jsx'
import NavWrapper from './components/NavWrapper.jsx'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthWrapper />,
      children: [
        {
          path: '/',
          element: <NavWrapper />,
          children: [
            {
              path: '/',
              element: <Home />
            }
          ]
        },
        {
          path: '',
          element: <AuthRedirect />,
          children : [
            {
              path: '/login',
              element: <Login />
            },
            {
              path: '/sign-up',
              element: <SignUp />
            },
            {
              path: '/reset-password',
              element: <ResetPassword />
            },
            {
              path: '/reset-confirm-password/:token',
              element: <ResetConfirmPassword />
            },
        
            {
              path: '/verification/:token',
              element: <VerifyAccount />
            }
          ]
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
