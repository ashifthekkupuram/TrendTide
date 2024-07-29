import React, { useState } from 'react'

import Hero from '../../components/Hero'

import './ResetConfirmPassword.css'
import Result from '../../components/Result'

const ResetConfirmPassword = () => {

    const [form, setForm] = useState({
        password: '',
        confirmPassword: ''
    })
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
            <h1>Set Your New Password</h1>
            <p>Enter you new password below </p>
            <form onSubmit={onSubmit}>
                <label htmlFor="password">New password*</label>
                <input value={form.password} type="password" name="password" id="password" onChange={(e)=>setForm({ ...form, password: e.target.value })} />
                <label htmlFor="password">New password(confirmation)*</label>
                <input value={form.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" onChange={(e)=>setForm({ ...form, confirmPassword: e.target.value })} />
                <div>
                    <button disabled={!form.password || !form.confirmPassword || !(form.password === form.confirmPassword)}>Confirm</button>
                </div>
            </form>
            </>}
            
        </div>
      </div>
    </div>
  )
}

export default ResetConfirmPassword
