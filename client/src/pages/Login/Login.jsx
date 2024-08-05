import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Hero from '../../components/Hero'

import { login } from '../../redux/slice/authSlice'

import './Login.css'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const onSubmit = async (e) => {
    setLoading(true)
    setError(null)
    e.preventDefault()
    console.log('Befour sign up '+loading)
    const result = await dispatch(login({...form}))
      if(result.payload.success){
        navigate('/')
      }else{
        setError(result.payload.message)
    }
    setLoading(false)
    console.log('After sign up '+loading)
  }

  return (
    <>
      <div className='auth'>
      <Hero />
      <div className='auth-form'>
        <div className='form'>
          <h1>Login</h1>
          { error ? <div className="error"> *{error}.</div> : null}
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email*</label>
            <input value={form.email} type="email" name="email" id="email" onChange={onChange} placeholder='Your email address' />
            <label htmlFor="password">Password*</label>
            <input value={form.password} type="password" name="password" id="password" onChange={onChange} placeholder='•••••••••••••' />
            <Link className='forgot' to='/reset-password'>Forgot your password?</Link>
            <div>
              <button disabled={!form.email || !form.password || loading}>{ loading ? 'Loading...' : 'Log in'}</button>
              <Link className='sign-up' to='/sign-up'>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default Login
