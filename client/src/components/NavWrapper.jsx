import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NavigationBar from './NavigationBar'
import PostCreateModal from './PostCreateModal'
import CommentSectionModal from './CommentSectionModal'

const NavWrapper = () => {

  const [showPostCreateModal, setShowPostCreateModal] = useState(false)
  const { showComments } = useSelector((state) => state.comments)

  return (
    <>
      <NavigationBar setShowPostCreateModal={setShowPostCreateModal} />
      <Outlet />
      <PostCreateModal showPostCreateModal={showPostCreateModal} setShowPostCreateModal={setShowPostCreateModal} />
      <CommentSectionModal />
    </>
  )
}

// export const ChangeComment = (condition, postId) => {
//   setShowCommentSectionModal({show: true, postId})
// }

export default NavWrapper
