import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IoSendSharp } from "react-icons/io5";
import { toast } from 'react-toastify'
import { MdEdit } from "react-icons/md";
import { TbPencilCancel } from 'react-icons/tb'

import axios from '../api/axios'
import Comment from './Comment';
import { showModal, fetchComments, addComment, updateComment } from '../redux/slice/commentsSlice';

const CommentSectionModal = () => {

  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentUpdation, setCommentUpdation] = useState({
    updation: false,
    commentId: null,
  })

  const dispatch = useDispatch()

  const { showComments, comments, postId } = useSelector((state) => state.comments)
  const { token } = useSelector((state) => state.auth)

  const onClose = () => {
    dispatch(showModal({showComments: false, postId: ''}))
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

      dispatch(addComment(response.data.comment))
      setComment('')

      toast.success(response.data.message)

    } catch (err) {
      
      if(err.response){
        toast.error(err.response.data.message)
      } else {
        toast.error('Internal Server Error')
      }

    } finally {
      setCommentLoading(false)
    }
  }

  const onUpdate = async () => {
    setCommentLoading(true)
    try {
      const response = await axios.put(`/comment/${commentUpdation.commentId}`, { text: comment }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      toast.success(response.data.message)

      dispatch(updateComment(response.data.comment))
      setComment('')
      setCommentUpdation({ updation: false, commentId: null })

    } catch (err) {
      
      if(err.response){
        toast.error(err.response.data.message)
      } else {
        toast.error('Internal Server Error')
      }

    } finally {
      setCommentLoading(false)
    }
  }

  const onUpdateCancel = () => {
    setCommentUpdation({ updation: false, commentId: null })
  }

  useEffect(() => {
    if (showComments) {
      setLoading(true)
      setError(null)
      const fetchPost = async () => {
        const result = await dispatch(fetchComments({postId}))
        console.log(result.comments)
        if(!result.success){
          setError(result.message)
        }
        setLoading(false)
      }
      fetchPost()
    }
  }, [showComments, postId])

  return (
    <Modal style={{ width: '100%' }} show={showComments} onHide={onClose} >
      <Modal.Header closeButton>
        <Modal.Title>Post Detail</Modal.Title>
      </Modal.Header>
      {loading ? <Spinner className='d-flex justify-content-center align-items-center m-5' /> : error ? <Modal.Body >{err}</Modal.Body> :
        <Modal.Body className='d-flex flex-column gap-1' style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>{Array.isArray(comments) && comments.length > 0 ? comments.map((item) => {
          return <Comment key={item._id} comment={item} setCommentUpdation={setCommentUpdation} setComment={setComment} />
        }) : <h5 className='d-flex justify-content-center align-items-center'>No comment were added</h5>}</Modal.Body>}
      <Modal.Footer className=''>
        {token && <InputGroup className='gap-1'>
          <Form.Control style={{ border: 'none' }} className='shadow-none' type='text' value={comment} name='comment' id='comment' onChange={onChange} placeholder='Write a comment...' />
          { commentUpdation.updation ?
              <>
               <Button className='rounded-circle bg-secondary' disabled={!comment.trim() || commentLoading || loading || error} onClick={onUpdateCancel} >{ commentLoading ? <Spinner style={{color: 'White', width: '15px', height: '15px'}} />: <TbPencilCancel /> }</Button> 
               <Button className='rounded-circle' disabled={!comment.trim() || commentLoading || loading || error} onClick={onUpdate} >{ commentLoading ? <Spinner style={{color: 'White', width: '15px', height: '15px'}} />: <MdEdit />  }</Button>
              </>
           :  <Button className='rounded-circle' disabled={!comment.trim() || commentLoading || loading || error} onClick={onSubmit} >{ commentLoading ? <Spinner style={{color: 'White', width: '15px', height: '15px'}} />: <IoSendSharp />  }</Button>}
        </InputGroup>}
      </Modal.Footer>
    </Modal>
  )
}

export default CommentSectionModal
