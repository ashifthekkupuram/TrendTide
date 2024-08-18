import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavigationBar from './NavigationBar'
import PostCreateModal from './PostCreateModal'

const NavWrapper = () => {

  const [showPostCreateModal, setShowPostCreateModal] = useState(false)

  return (
    <>
      <NavigationBar setShowPostCreateModal={setShowPostCreateModal} />
      <Outlet />
      <PostCreateModal showPostCreateModal={showPostCreateModal} setShowPostCreateModal={setShowPostCreateModal} />
    </>
  )
}

export default NavWrapper
