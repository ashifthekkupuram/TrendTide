import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IoSendSharp } from "react-icons/io5";

import axios from '../api/axios'

const CommentSectionModal = ({ postId = '66bdbf0ae8658c1706994364', showCommentSectionModal, setShowCommentSectionModal }) => {

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [commentLoading, setCommentLoading] = useState(true)

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  const onClose = () => {
    setShowCommentSectionModal(false)
  }

  const onChange = (e) => {
    setComment(e.target.value)
  }

  const onSubmit = async () => {
    setCommentLoading(true)
    try {
      const response = await axios.post(`/comment/${postId}`, { text: comment }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      setComment('')

    } catch (err) {
      
      if(err.response){
        
      } else {
        
      }

    } finally {
      setCommentLoading(false)
    }
  }

  useEffect(() => {
    if (showCommentSectionModal) {
      setLoading(true)
      setError(null)
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/comment/${postId}`)
          setComments(response.data.comments)
        } catch (err) {
          if (err.response) {
            setError(err.response.data.message)
          } else {
            setError('Internal Server Error')
          }
        } finally {
          setLoading(false)
        }
      }
      fetchPost()
    }
  }, [postId])

  return (
    <Modal style={{ width: '100%' }} show={showCommentSectionModal} onHide={onClose} >
      <Modal.Header closeButton>
        <Modal.Title>Post Detail</Modal.Title>
      </Modal.Header>
      {loading ? <Spinner className='d-flex justify-content-center align-items-center m-5' /> : error ? <Modal.Body >{err}</Modal.Body> :
        <Modal.Body>{comments.length > 0 ? comments.map((item) => {
          return <p>{item.text}</p>
        }) : <h5 className='d-flex justify-content-center align-items-center'>No comment were added</h5>}</Modal.Body>}
      <Modal.Footer className=''>
        {token && <InputGroup className='gap-1'>
          <Form.Control style={{ border: 'none' }} className='shadow-none' type='text' value={comment} name='comment' id='comment' onChange={onChange} placeholder='Write a comment...' />
          <Button className='rounded-circle' disabled={!comment.trim() || commentLoading} onClick={onSubmit} >{ commentLoading ? <Spinner style={{color: 'White', width: '15px', height: '15px'}} />: <IoSendSharp />  }</Button>
        </InputGroup>}
      </Modal.Footer>
    </Modal>
  )
}

export default CommentSectionModal
