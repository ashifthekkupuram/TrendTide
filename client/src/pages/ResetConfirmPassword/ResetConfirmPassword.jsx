import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Hero from '../../components/Hero'

import './ResetConfirmPassword.css'
import Result from '../../components/Result'
import axios from '../../api/axios'

const ResetConfirmPassword = () => {

    const { token } = useParams()
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
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try{
          const response = await axios.post(`/auth/reset/${token}`, { password: form.password })
          setResult({ result: true, success: true, message: response.data.message, description: 'Password seem to be updated' })
        } catch (err) {
          if(err?.response){
            setResult({ result: true, success: false, message: err.response.data.message, description: 'Seems like its not working' })
          }else{
            setResult({ result: true, success: false, message: 'Internal Server Error', description: 'Seems like its not working' })
          }
        }
        setLoading(false)
    }

    useEffect(()=>{
      const resetGET = async () => {
        setLoading(true)
        try{
          await axios.get(`/auth/reset/${token}`)
        } catch (err) {
          if(err?.response){
            setResult({ result: true, success: false, message: err.response.data.message, description: 'Seems like its not working' })
          }else{
            setResult({ result: true, success: false, message: 'Internal Server Error', description: 'Seems like its not working' })
          }
        }
        setLoading(false)
      }
      resetGET()
    },[])

  return (
    <div className='auth'>
      <Hero />
      <div className='auth-form'>
        <div className='form'>
            { result.result ? <Result success={result.success} message={result.message} description={result.description} /> :  <>
            <h1>Set Your New Password</h1>
            <p>Enter you new password below </p>
            <form>
                <label htmlFor="password">New password*</label>
                <input value={form.password} type="password" name="password" id="password" onChange={(e)=>setForm({ ...form, password: e.target.value })} />
                <label htmlFor="password">New password(confirmation)*</label>
                <input value={form.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" onChange={(e)=>setForm({ ...form, confirmPassword: e.target.value })} />
                <div className={`password-matching ${!form.password || !form.confirmPassword || (form.password === form.confirmPassword) ? 'password-hide' : ''}`}>*passwords do not match</div>
                <div>
                    <button onClick={onSubmit} disabled={!form.password || !form.confirmPassword || !(form.password === form.confirmPassword) || loading}>{loading ? 'Loading...' : 'Confirm'}</button>
                </div>
            </form>
            </>}
            
        </div>
      </div>
    </div>
  )
}

export default ResetConfirmPassword
