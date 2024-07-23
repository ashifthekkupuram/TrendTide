import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo, Quantum } from '../../assets/images'

import './SignUp.css'

const SignUp = () => {

  const [form, setForm] = useState({
    email:"",
    password1:"",
    password2:""
  })
  const [terms, setTerms] = useState(false)

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  console.log(terms)

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
            <label htmlFor="email">Email Address*</label>
            <input value={form.email} type="email" name="email" id="email" onChange={onChange} placeholder='Your email address' />
            <label htmlFor="password1">Password*</label>
            <input value={form.password1} type="password" name="password1" id="password1" onChange={onChange} placeholder='•••••••••••••' />
            <label htmlFor="password2">Repeat Password*</label>
            <input value={form.password2} type="password" name="password2" id="password2" onChange={onChange} placeholder='•••••••••••••' />
            <div>
              <input value={terms} onChange={(e) => setTerms(prev => !prev)} type="checkbox" />
              <small>Agree to our terms of service</small>
            </div>
            <div>
              <button disabled={!form.email || !form.password1 || !form.password2 || !terms}>Sign up</button>
              <Link className='sign-up' to='/login'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
