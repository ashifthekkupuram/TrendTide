import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Container, Button, Image } from 'react-bootstrap'

import Result from '../components/Result'
import axios from '../api/axios'
import { LogoBlack, Connection } from '../assets/images'

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
    },[token])

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
              <Form.Label>Password</Form.Label>
              <Form.Control style={{ height: '50px' }} type="password" value={form.password} id='password' name='password' placeholder="•••••••••••••" onChange={e => setForm({...form, password: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control style={{ height: '50px' }} type="password" value={form.confirmPassword} id='confirmPassword' name='confirmPassword' placeholder="•••••••••••••" onChange={e => setForm({...form, confirmPassword: e.target.value})} />
              { (form.password || form.confirmPassword) && !(form.password === form.confirmPassword)  && <Form.Text style={{color: 'red'}} >*passwords not matching</Form.Text> }
            </Form.Group>
            <div>
              <Button style={{ width: '100px' }} disabled={!form.password || !form.confirmPassword || !(form.password === form.confirmPassword) || loading} type="submit" id='button' >{loading ? 'Loading...' : 'Continue'}</ Button>
            </div>
          </Form>
        </Container>}
      </Container>
    </Container>
    )
}

export default ResetConfirmPassword
