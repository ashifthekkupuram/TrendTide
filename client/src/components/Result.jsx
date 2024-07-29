import React from 'react'

import { Success, Failed } from '../assets/svgs'

const Result = ({success, message, description}) => {
  return (
    <>
        <h1>{message}</h1>
        <p>{description}</p>
        { success ?  <img src={Success} alt='success' /> : <img src={Failed} alt='failed' />}
    </>
  )
}

export default Result
