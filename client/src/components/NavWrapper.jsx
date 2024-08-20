import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavigationBar from './NavigationBar'
import PostCreateModal from './PostCreateModal'
import PostDetailModal from './PostDetailModal'

const NavWrapper = () => {

  const [showPostCreateModal, setShowPostCreateModal] = useState(false)
  const [showPostDetailModal, setShowPostDetailModal] = useState(false)

  return (
    <>
      <NavigationBar setShowPostCreateModal={setShowPostCreateModal} setShowPostDetailModal={setShowPostDetailModal} />
      <Outlet />
      <PostCreateModal showPostCreateModal={showPostCreateModal} setShowPostCreateModal={setShowPostCreateModal} />
      <PostDetailModal showPostDetailModal={showPostDetailModal} setShowPostDetailModal={setShowPostDetailModal} />
    </>
  )
}

export default NavWrapper
