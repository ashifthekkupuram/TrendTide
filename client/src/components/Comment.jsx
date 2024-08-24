import React from 'react'
import { Card, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from "react-icons/ai";

import { deleteComment, updateComment } from '../redux/slice/commentsSlice'
import axios from '../api/axios'

const Comment = ({ comment }) => {

  const dispatch = useDispatch()

  const { token, UserData } = useSelector((state) => state.auth)

  const onDelete = async () => {
    try {
      await axios.delete(`/comment/${comment._id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      dispatch(deleteComment(comment._id))
    } catch (err) {
      console.log('Deletion failed')
    }
  }

  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Header style={{ fontSize: '14px', border: 'none', backgroundColor: '#FFFFFF', marginBottom: '8px' }} className='d-flex align-items-center gap-2 p-0'>
          <Image style={{ width: '32px', height: '32px' }} src={comment.author.profile} fluid />
          {comment.author.name.firstName + ' ' + comment.author.name.secondName}
        </Card.Header>
        <Card.Text>
          {comment.text}
        </Card.Text>
        {UserData._id == comment.author._id && UserData._id == comment.post.author && 
        <Card.Footer>
          <AiFillDelete color='red' onClick={onDelete} />
        </Card.Footer>}
      </Card.Body>
    </Card>
  )
}

export default Comment
