import React from 'react'

import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

import { Success, Failed } from '../assets/svgs'

const Result = ({success, message, description}) => {

  const imageStyle = {maxWidth: '120px', marginRight: 'auto', marginLeft: 'auto', marginTop: '15px'}

  return (
    <Container style={{maxWidth: '700px',maxHeight: '600px', backgroundColor: '#FFFFFF', padding: '80px 50px' }} className='d-flex flex-column justify-content-center align-items-start bg-form rounded shadow'>
        <h1>{message}</h1>
        <p style={{color: '#5D5F63'}}>{description}</p>
        { success ?  <Image style={imageStyle} src={Success} alt='success' /> : <Image style={imageStyle} src={Failed} alt='failed' />}
    </Container>
  )
}

export default Result
