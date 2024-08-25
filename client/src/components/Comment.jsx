import React, { useState } from 'react'
import { Card, Image, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import ConfirmCommentDelete from './ConfirmCommentDelete';

const Comment = ({ comment, setCommentUpdation, setComment }) => {

  const [commentDeletion, setCommentDeletion] = useState({
    show: false,
    commentId: null
  })

  const { UserData } = useSelector((state) => state.auth)

  const onDelete = () => {
    setCommentDeletion({ show: true, commentId: comment._id })
  }

  const onEdit = () => {
    setCommentUpdation({ updation: true, commentId: comment._id })
    setComment(comment.text)
  }

  const isCommentAuthor = UserData._id === comment.author._id;
  const isPostAuthor = UserData._id === comment.post.author;

  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Header style={{ fontSize: '14px', border: 'none', backgroundColor: '#FFFFFF', marginBottom: '8px' }} className='d-flex align-items-center gap-2 p-0'>
            <Image style={{ width: '32px', height: '32px' }} src={comment.author.profile} fluid />
            {comment.author.name.firstName + ' ' + comment.author.name.secondName}
          </Card.Header>
          <Card.Text>
            {comment.text}
          </Card.Text>
          {isPostAuthor || isCommentAuthor &&
            <Card.Footer>
              { isPostAuthor && <AiFillDelete color='red' onClick={onDelete} /> }
              { isCommentAuthor && <MdEdit color='grey' onClick={onEdit}  />}
            </Card.Footer>}
        </Card.Body>
      </Card>
      <ConfirmCommentDelete commentDeletion={commentDeletion} setCommentDeletion={setCommentDeletion} />
    </>
  )
}

export default Comment
