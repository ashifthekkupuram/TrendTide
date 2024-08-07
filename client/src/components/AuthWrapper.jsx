import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';

import { refresh } from '../redux/slice/authSlice'

const AuthWrapper = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(refresh()).then((result)=>{
            if(result.payload.success){
                navigate('/')
              }else{
              
              }
        })
    },[])

  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default AuthWrapper
