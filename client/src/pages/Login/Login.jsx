import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo, Quantum } from '../../assets/images'

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
      <div className='auth-intro'>
        <div className='auth-intro-section'>
          <h1 className='heading'>TrendTide</h1>
          <img className='logo' src={Logo} alt='logo' />
        </div>
        <div className='auth-intro-section'>
          <h1 className='caption'>Online Community makes <br /> 
          people more Creative</h1>
        </div>
        <div className='auth-intro-section'>
          <img className='quantum' src={Quantum} alt='quantum' />
        </div>
      </div>
      <div className='auth-form'>
        <div className='form'>
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email*</label>
            <input value={form.email} type="email" name="email" id="email" onChange={onChange} autoComplete={false} placeholder='Your email address' />
            <label htmlFor="password">Password*</label>
            <input value={form.password} type="password" name="password" id="password" onChange={onChange} autoComplete={false} placeholder='•••••••••••••' />
            <a className='forgot' href='#'>Forgot your password?</a>
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
