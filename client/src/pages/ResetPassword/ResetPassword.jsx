import React, { useState } from 'react'

import Hero from '../../components/Hero'

import './ResetPassword.css'
import Result from '../../components/Result'
import axios from '../../api/axios'

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [result, setResult] = useState({
        result: false,
        success: false,
        message: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
          const response = await axios.post('/auth/reset-create', { email })
          setResult({ result: true, success: true, message: response.data.message, description: 'Check your email to reset password' })
        } catch (err) {
          if(err?.response){
            setResult({ result: true, success: false, message: err.response.data.message, description: 'Seems like its not working' })
          }else{
            setResult({ result: true, success: false, message: 'Internal Server Error', description: 'Seems like its not working' })
          }
        }
        setLoading(false)
    }

  return (
    <div className='auth'>
      <Hero />
      <div className='auth-form'>
        <div className='form'>
            { result.result ? <Result success={result.success} message={result.message} description={result.description} /> :  <>
            <h1>Reset Your Password</h1>
            <p>To request a new password, enter your email </p>
            <form>
                <label htmlFor="email">Enter Your Email</label>
                <input value={email} type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} />
                <div>
                    <button onClick={onSubmit} disabled={!email || loading}>{loading ? 'Loading...' : 'Continue'}</button>
                </div>
            </form>
            </>}
            
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
