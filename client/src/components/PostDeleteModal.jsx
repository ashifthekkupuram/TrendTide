import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import { setDeletePost } from '../redux/slice/deletePostSlice'
import { deletePost } from '../redux/slice/postsSlice'
import axios from '../api/axios'

const PostDeleteModal = () => {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const { show, postId, postName } = useSelector((state) => state.deletePost)
    const token = useSelector((state) => state.auth.token)

    const onClose = () => {
        dispatch(setDeletePost({ show: false, postId: null, postName: null }))
    }

    const onDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`/post/${postId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            },)

            dispatch(setDeletePost({ show: false, postId: null, postName: null }))
            dispatch(deletePost({ postId, }))
        } catch (err) {
            console.log('Failed Deletion')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Post {postName && postName}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column gap-1'>
                are you sure you wanna delete {postName && postName}?
                <div className='d-flex gap-1 p-0 m-0'>
                    <Button disabled={loading} onClick={onDelete} variant='danger'>{loading ? 'Loading...' : 'Delete'}</Button>
                    <Button onClick={onClose} variant='secondary'>Close</Button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default PostDeleteModal
