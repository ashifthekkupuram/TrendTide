import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Form, Container, Button, Alert, Image } from 'react-bootstrap'

import axios from '../api/axios'
import { LogoBlack, Connection } from '../assets/images';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const SignUp = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password1: "",
    password2: ""
  })
  const [terms, setTerms] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const onSubmit = async (e) => {
    setLoading(true)
    setError(null)
    e.preventDefault()
    try {
      const response = await axios.post('/auth/register/', { email: form.email, password: form.password1 })
      navigate('/login')
      toast(response.data.message)
    } catch (err) {
      if (err?.response) {
        setError(err?.response?.data?.message)
      } else {
        setError('Internal Server Error')
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
        <Container style={{ maxWidth: '700px', maxHeight: '700px', backgroundColor: '#FFFFFF', padding: '80px 50px' }} className='bg-form rounded shadow'>
          <Image src={LogoBlack} style={{ display: 'block', width: '180px', marginBottom: '20px', marginTop: '-30px' }} className='d-xl-none mx-auto' />
          <h1 className='mb-4'>Sing up</h1>
          {error && <Alert variant='danger'>{error}.</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control style={{ height: '50px' }} type="email" value={form.email} id='email' name='email' placeholder="Your email address" onChange={onChange} />
              { (form.email && !form.email.match(EMAIL_REGEX))  && <Form.Text style={{color: 'red'}} >*invalid email</Form.Text> }
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control style={{ height: '50px' }} type="password" value={form.password1} id='password1' name='password1' placeholder="•••••••••••••" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control style={{ height: '50px' }} type="password" value={form.password2} id='password2' name='password2' placeholder="•••••••••••••" onChange={onChange} />
              { (form.password1 || form.password2) && !(form.password1 === form.password2)  && <Form.Text style={{color: 'red'}} >*passwords not matching</Form.Text> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check value={terms} onChange={e => setTerms(e.target.checked)} type="checkbox" label="Agree to terms and conditions" />
            </Form.Group>
            <div>
              <Button style={{ width: '100px' }} disabled={!form.email || !form.password1 || !password2 || !terms || !(form.password1 === form.password2) || loading} type="submit" id='button' >{loading ? 'Loading...' : 'Sing up'}</ Button>
              <Link style={{ display: 'inline-block', marginLeft: '10px', textDecoration: 'none', fontWeight: '500' }} to='/login'>Login</Link>
            </div>
          </Form>
        </Container>
      </Container>
    </Container>
  )
}

export default SignUp
