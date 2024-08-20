import React, { useEffect, useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import axios from '../api/axios'

const PostDetailModal = ({ postId = '66bdbf0ae8658c1706994364', showPostDetailModal, setShowPostDetailModal }) => {

  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onClose = () => {
    setShowPostDetailModal(false)
  }

  useEffect(() => {
    if(showPostDetailModal){
    setLoading(true)
    setError(null)
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/post/${postId}`)
        setPost(response.data)
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
    <Modal style={{ width: '100%' }} show={showPostDetailModal} onHide={onClose} >
      {loading ? <Spinner /> : <>
        <Modal.Header closeButton>
          <Modal.Title>Post Detail</Modal.Title>
        </Modal.Header>
        {error ? <Modal.Body >{error}</Modal.Body> : 
        <>
        <Modal.Body>{post?.caption}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onClose}>
              Save Changes
            </Button>
          </Modal.Footer>
          </>}
      </>}
    </Modal>
  )
}

export default PostDetailModal
