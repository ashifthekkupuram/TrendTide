import React, { useState } from 'react'

import Hero from '../../components/Hero'

import './VerifyAccount.css'
import Result from '../../components/Result'

const VerifyAccount = () => {

    const [hover, setHover] = useState(false)
    const [result, setResult] = useState({
        result: false,
        success: false,
        message: '',
        description: ''
    })

    const onVerify = (e) => {
        e.prevent.default()
        setResult({...result, result: true, success: true})
    }

    const onDelete = (e) => {
        e.prevent.default()
        setResult({...result, result: true, success: false})
    }

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
                    <button onSubmit={onVerify}>Verify</button>
                    <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{backgroundColor: hover ? '#F82B2B' :'#F54343'}} onSubmit={onDelete}>Delete</button>
                </div>
            </form>
            </>}
            
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount
