import React from 'react'

import { LogoBlack } from '../assets/images'

const Hero = () => {
  return (
    <div className='auth-intro'>
        <div className='auth-intro-section'>
          <h1 className='heading'>TrendTide</h1>
          <img className='logo' src={LogoBlack} alt='logo' />
        </div>
        <div className='auth-intro-section'>
          <h1 className='caption'>Online Community makes <br /> 
          people more Creative</h1>
        </div>
        <div className='auth-intro-section'>
          <img className='quantum' src={LogoBlack} alt='quantum' />
        </div>
    </div>
  )
}

export default Hero
