import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { deleteComment, updateComment } from '../redux/slice/commentsSlice'
import axios from '../api/axios'

const ConfirmCommentDelete = ({ commentDeletion, setCommentDeletion }) => {

    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const onClose = () => {
        setCommentDeletion({show: false, commentId: null})
    }

    const onDelete = async () => {
        try {
          await axios.delete(`/comment/${commentDeletion.commentId}`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          dispatch(deleteComment(commentDeletion.commentId))
          setCommentDeletion({show: false, commentId: null})
        } catch (err) {
          
        }
      }

    return (
        <Modal show={commentDeletion.show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure wanna delete this comment?
                <div className='d-flex gap-2 m-3'>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        Delete
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmCommentDelete
