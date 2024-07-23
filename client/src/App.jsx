import { createBrowserRouter,RouterProvider,Link } from 'react-router-dom'

import './App.css'

import { Login, SignUp } from './pages'

function App() {

  const router = createBrowserRouter([
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
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
