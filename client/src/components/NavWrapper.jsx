import React from 'react'
import { Outlet } from 'react-router-dom'

import NavigationBar from './NavigationBar'

const NavWrapper = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}

export default NavWrapper
