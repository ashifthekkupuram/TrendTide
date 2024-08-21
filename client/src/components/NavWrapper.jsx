import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavigationBar from './NavigationBar'
import PostCreateModal from './PostCreateModal'
import CommentSectionModal from './CommentSectionModal'

const NavWrapper = () => {

  const [showPostCreateModal, setShowPostCreateModal] = useState(false)
  const [showCommentSectionModal, setShowCommentSectionModal] = useState({ show: false ,postId: null })

  return (
    <>
      <NavigationBar setShowPostCreateModal={setShowPostCreateModal} setShowCommentSectionModal={setShowCommentSectionModal} />
      <Outlet />
      <PostCreateModal showPostCreateModal={showPostCreateModal} setShowPostCreateModal={setShowPostCreateModal} />
      <CommentSectionModal showCommentSectionModal={showCommentSectionModal} setShowCommentSectionModal={setShowCommentSectionModal} />
    </>
  )
}

// export const ChangeComment = (condition, postId) => {
//   setShowCommentSectionModal({show: true, postId})
// }

export default NavWrapper
