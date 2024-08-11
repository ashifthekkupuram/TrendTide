import React,{ useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthRedirect = () => {

    const token = useSelector((state) => state.auth.token)

    useEffect(()=>{

    },[token])

  return (
    token ? <Navigate to='/' /> : <Outlet />
  )
}

export default AuthRedirect
