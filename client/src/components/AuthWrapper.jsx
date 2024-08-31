import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

import { refresh } from '../redux/slice/authSlice'

const AuthWrapper = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(refresh()).then((result) => {
      if (result.payload.success) {
        
      } else {

      }
    })
  }, [])

  return (
    <Outlet />
  )
}

export default AuthWrapper
