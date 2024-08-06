import React, { useState } from 'react'
import { Form, Container, Button, Alert, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Result from '../components/Result'
import axios from '../api/axios'
import { LogoBlack, Connection } from '../assets/images'

const ResetPassword = () => {

  const [email, setEmail] = useState('')
  const [result, setResult] = useState({
    result: true,
    success: false,
    message: 'Testing',
    description: 'asdasdasdasdasdasdasd'
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await axios.post('/auth/reset-create', { email })
      setResult({ result: true, success: true, message: response.data.message, description: 'Check your email to reset password' })
    } catch (err) {
      if (err?.response) {
        setResult({ result: true, success: false, message: err.response.data.message, description: 'Seems like its not working' })
      } else {
        setResult({ result: true, success: false, message: 'Internal Server Error', description: 'Seems like its not working' })
      }
    }
    setLoading(false)
  }

  return (
    <Container className='d-flex vh-100 w-100 p-0' fluid >
      <Container style={{ padding: '50px', flex: 1 }} className='d-none d-xl-flex flex-column align-items-center vh-100 w-50' fluid>
        <Image src={LogoBlack} style={{ width: '150px', marginRight: 'auto' }} />
        <Image src={Connection} style={{ maxWidth: '500px', margin: 'auto' }} />
      </Container>
      <Container style={{ flex: 1 }} className='d-flex justify-content-center align-items-center vh-100 w-xl-50' fluid>
        {result.result ? <Result success={result.success} message={result.message} description={result.description} /> : 
        <Container style={{ maxWidth: '700px', maxHeight: '700px', backgroundColor: '#FFFFFF', padding: '80px 50px' }} className='bg-form rounded shadow'>
          <Image src={LogoBlack} style={{ display: 'block', width: '180px', marginBottom: '20px', marginTop: '-30px' }} className='d-xl-none mx-auto' />
          <h1 className='mb-4'>Reset Your Password</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control style={{ height: '50px' }} type="email" value={email} id='email' name='email' placeholder="Your email address" onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <div>
              <Button style={{ width: '100px' }} disabled={!email || loading} type="submit" id='button' >{loading ? 'Loading...' : 'Continue'}</ Button>
              <Link style={{ display: 'inline-block', marginLeft: '10px', textDecoration: 'none', fontWeight: '500' }} to='/login'>Log in</Link>
            </div>
          </Form>
        </Container>}
      </Container>
    </Container>
  )
}

export default ResetPassword
