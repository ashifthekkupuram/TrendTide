import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Form, Container, Button, Alert, Image } from 'react-bootstrap'

import { login } from '../redux/slice/authSlice'
import { LogoBlack, Connection } from '../assets/images';


const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const onSubmit = async (e) => {
    setLoading(true)
    setError(null)
    e.preventDefault()
    console.log('Befour sign up ' + loading)
    const result = await dispatch(login({ ...form }))
    if (result.payload.success) {
      navigate('/')
    } else {
      setError(result.payload.message)
    }
    setLoading(false)
    console.log('After sign up ' + loading)
  }

  return (
    <Container className='d-flex vh-100 w-100 p-0' fluid >
      <Container style={{ padding: '50px', flex: 1 }} className='d-none d-xl-flex flex-column align-items-center vh-100 w-50' fluid>
        <Image src={LogoBlack} style={{ width: '150px', marginRight: 'auto' }} />
        <Image src={Connection} style={{ maxWidth: '500px', margin: 'auto' }} />
      </Container>
      <Container style={{flex: 1}} className='d-flex justify-content-center align-items-center vh-100 w-xl-50' fluid>
        <Container style={{maxWidth: '700px',maxHeight: '700px', backgroundColor: '#FFFFFF', padding: '80px 50px' }} className='bg-form rounded shadow'>
          <Image src={LogoBlack} style={{display: 'block', width: '180px', marginBottom: '20px', marginTop: '-30px' }} className='d-xl-none mx-auto' />
          <h1 className='mb-4'>Log in</h1>
          {error && <Alert variant='danger'>{error}.</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control style={{ height: '50px' }} type="email" value={form.email} id='email' name='email' placeholder="Your email address" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control style={{ height: '50px' }} type="password" value={form.password} id='password' name='password' placeholder="•••••••••••••" onChange={onChange} />
            </Form.Group>
            <Link style={{ display: 'inline-block', marginBottom: '10px', textDecoration: 'none' }} to='/reset-password'>Forgot your password?</Link>
            <div>
              <Button style={{ width: '100px' }} disabled={!form.email || !form.password || loading} type="submit" id='button' >{loading ? 'Loading...' : 'Log in'}</ Button>
              <Link style={{ display: 'inline-block', marginLeft: '10px', textDecoration: 'none', fontWeight: '500' }} to='/sign-up'>Sign up</Link>
            </div>
          </Form>
        </Container>
      </Container>
    </Container>
  )
}

export default Login
