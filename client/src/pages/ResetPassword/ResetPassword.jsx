import React, { useState } from 'react'

import Hero from '../../components/Hero'

import './ResetPassword.css'
import Result from '../../components/Result'

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [result, setResult] = useState({
        result: false,
        success: false,
        message: '',
        description: ''
    })

    const onSubmit = (e) => {
        e.prevent.default()
        setResult({...result, result: true})
    }

  return (
    <div className='auth'>
      <Hero />
      <div className='auth-form'>
        <div className='form'>
            { result.result ? <Result success={result.success} message={result.message} description={result.description} /> :  <>
            <h1>Reset Your Password</h1>
            <p>To request a new password, enter your email </p>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Enter Your Email</label>
                <input value={email} type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} />
                <div>
                    <button disabled={!email}>Continue</button>
                </div>
            </form>
            </>}
            
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
