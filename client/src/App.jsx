import React from 'react'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

import './App.css'

import { Login, SignUp, ResetPassword, ResetConfirmPassword, VerifyAccount } from './pages'
import AuthWrapper from './components/AuthWrapper.jsx'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthWrapper />,
      children: [
        {
          path: '/',
          element: <>
            <h1>Home</h1> <br />
            <Link to='/login'>Login</Link><br />
            <Link to='/sign-up'>Sing up</Link>
          </>
        },
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
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
