import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Hero from '../../components/Hero'

import './VerifyAccount.css'
import Result from '../../components/Result'
import axios from '../../api/axios'

const VerifyAccount = () => {

    const { token } = useParams()
    const [hover, setHover] = useState(false)
    const [result, setResult] = useState({
        result: false,
        success: false,
        message: '',
        description: ''
    })

    const onVerify = async (e) => {
        e.preventDefault()
        try{
          const response = await axios.post(`/auth/verify/${token}`)
          setResult({ result: true, success: true, message: response.data.message, description: 'Account seem to be activated' })
        } catch (err) {
          if(err?.response){
            setResult({ result: true, success: false, message: err.response.data.message, description: 'Seems like its not working' })
          }else{
            setResult({ result: true, success: false, message: 'Internal Server Error', description: 'Seems like its not working' })
          }
        }
    }

    const onDelete = async (e) => {
      e.preventDefault()
      try{
        const response = await axios.delete(`/auth/verify/${token}`)
        setResult({ result: true, success: true, message: response.data.message, description: 'Account seem to be deleted' })
      } catch (err) {
        if(err?.response){
          setResult({ result: true, success: false, message: err.response.data.message, description: 'Seems like its not working' })
        }else{
          setResult({ result: true, success: false, message: 'Internal Server Error', description: 'Seems like its not working' })
        }
      }
    }

    useEffect(()=>{
      const verifyGET = async () => {
        try{
          await axios.get(`/auth/verify/${token}`)
        } catch (err) {
          if(err?.response){
            setResult({ result: true, success: false, message: err.response.data.message, description: 'Seems like its not working' })
          }else{
            setResult({ result: true, success: false, message: 'Internal Server Error', description: 'Seems like its not working' })
          }
        }
      }
      verifyGET()
    },[token])

  return (
    <div className='auth'>
      <Hero />
      <div className='auth-form'>
        <div className='form'>
            { result.result ? <Result success={result.success} message={result.message} description={result.description} /> :  <>
            <h1>Verify Your Account</h1>
            <p>The Verify button validates and confirms a user's account, while the Delete button permanently removes the user's account and associated data. </p>
            <form>
                <div>
                    <button onClick={onVerify}>Verify</button>
                    <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{backgroundColor: hover ? '#F82B2B' :'#F54343'}} onClick={onDelete}>Delete</button>
                </div>
            </form>
            </>}
            
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount
