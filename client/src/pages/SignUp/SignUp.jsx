import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Logo, Quantum } from '../../assets/images'
import Hero from '../../components/Hero'
import axios from '../../api/axios'

import './SignUp.css'

const SignUp = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email:"",
    password1:"",
    password2:""
  })
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const onSubmit = async (e) => {
    setLoading(true)
    setError(null)
    e.preventDefault()
    try{
      const response = await axios.post('/auth/register/', {email: form.email, password: form.password1})
      navigate('/login')
      toast(response.data.message)
    } catch (err) {
      if(err?.response){
        setError(err?.response?.data?.message)
      }else{
        setError('Internal Server Error')
      }
    }
    setLoading(false)
    
  }

  return (
    <>
      <div className='auth'>
      <Hero />
      <div className='auth-form'>
        <div className='form'>
          <h1>Sign up</h1>
          { error ? <div className="error"> *{error}.</div> : null}
          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email Address*</label>
            <input value={form.email} type="email" name="email" id="email" onChange={onChange} placeholder='Your email address' />
            <label htmlFor="password1">Password*</label>
            <input value={form.password1} type="password" name="password1" id="password1" onChange={onChange} placeholder='•••••••••••••' />
            <label htmlFor="password2">Repeat Password*</label>
            <input value={form.password2} type="password" name="password2" id="password2" onChange={onChange} placeholder='•••••••••••••' />
            <div className={`password-matching ${!form.password1 || !form.password2 || (form.password1 === form.password2) ? 'password-hide' : ''}`}>*passwords do not match</div>
            <div>
              <input value={terms} onChange={(e) => setTerms(prev => !prev)} type="checkbox" />
              <small>Agree to our terms of service</small>
            </div>
            <div>
              <button disabled={!form.email || !form.password1 || !form.password2 || !terms || loading || !(form.password1 === form.password2)}>{loading ? 'Loading...' : 'Sign up'}</button>
              <Link className='sign-up' to='/login'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* <ToastContainer /> */}
    </>
  )
}

export default SignUp
