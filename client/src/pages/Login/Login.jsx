import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Hero from '../../components/Hero'

import './Login.css'

const Login = () => {

  const [form, setForm] = useState({
    email:"",
    password:""
  })

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div className='auth'>
      <Hero />
      <div className='auth-form'>
        <div className='form'>
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email*</label>
            <input value={form.email} type="email" name="email" id="email" onChange={onChange} autoComplete={false} placeholder='Your email address' />
            <label htmlFor="password">Password*</label>
            <input value={form.password} type="password" name="password" id="password" onChange={onChange} autoComplete={false} placeholder='•••••••••••••' />
            <Link className='forgot' to='/reset-password'>Forgot your password?</Link>
            <div>
              <button disabled={!form.email || !form.password}>Log in</button>
              <Link className='sign-up' to='/sign-up'>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
