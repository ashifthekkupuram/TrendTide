import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Container, Button, Image } from 'react-bootstrap'

import Hero from '../components/Hero'
import Result from '../components/Result'
import axios from '../api/axios'
import { LogoBlack, Connection } from '../assets/images'

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
      <Container className='d-flex vh-100 w-100 p-0' fluid >
      <Container style={{ padding: '50px', flex: 1 }} className='d-none d-xl-flex flex-column align-items-center vh-100 w-50' fluid>
        <Image src={LogoBlack} style={{ width: '150px', marginRight: 'auto' }} />
        <Image src={Connection} style={{ maxWidth: '500px', margin: 'auto' }} />
      </Container>
      <Container style={{ flex: 1 }} className='d-flex justify-content-center align-items-center vh-100 w-xl-50' fluid>
        {result.result ? <Result success={result.success} message={result.message} description={result.description} /> : 
        <Container style={{ maxWidth: '700px', maxHeight: '700px', backgroundColor: '#FFFFFF', padding: '80px 50px' }} className='bg-form rounded shadow'>
          <Image src={LogoBlack} style={{ display: 'block', width: '180px', marginBottom: '20px', marginTop: '-30px' }} className='d-xl-none mx-auto' />
          <h1 className='mb-4'>Verify Your Account</h1>
          <p style={{color: '#5D5F63'}}> The Verify button validates and confirms a user's account, while the Delete button permanently removes the user's account and associated data.  </p>
          <Form >
            <div>
              <Button style={{ width: '100px' }} onClick={onVerify} >Verify</ Button>
              <Button style={{ width: '100px', marginLeft: '5px' }} className='btn-danger' onClick={onDelete} >Delete</ Button>
            </div>
          </Form>
        </Container>}
      </Container>
    </Container>
    )

  // return (
  //   <div className='auth'>
  //     <Hero />
  //     <div className='auth-form'>
  //       <div className='form'>
  //           { result.result ? <Result success={result.success} message={result.message} description={result.description} /> :  <>
  //           <h1>Verify Your Account</h1>
  //           <p>The Verify button validates and confirms a user's account, while the Delete button permanently removes the user's account and associated data. </p>
  //           <form>
  //               <div>
  //                   <button onClick={onVerify}>Verify</button>
  //                   <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{backgroundColor: hover ? '#F82B2B' :'#F54343'}} onClick={onDelete}>Delete</button>
  //               </div>
  //           </form>
  //           </>}
            
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default VerifyAccount
