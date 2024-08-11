import React from 'react'
import { Outlet } from 'react-router-dom'

import Nav from './Nav'

const NavWrapper = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default NavWrapper
