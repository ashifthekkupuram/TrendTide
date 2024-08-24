import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Form, Spinner, Image, Alert } from 'react-bootstrap'

import { setEditPost } from '../redux/slice/editPostSlice'
import { updatePost } from '../redux/slice/postsSlice'
import axios from '../api/axios'

const PostEditModal = () => {

    const [form, setForm] = useState({ caption: '', removeImage: false, image: '' })
    const [postLoading, setPostLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const { show, postId, postName } = useSelector((state) => state.editPost)
    const token = useSelector((state) => state.auth.token)

    const onClose = () => {
        dispatch(setEditPost({ show: false, postId: null, postName: null }))
    }

    const onSubmit = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.put(`/post/${postId}`, { caption: form.caption, removeImage: form.removeImage }, { headers: { authorization: `Bearer ${token}` } })
            dispatch(updatePost(response.data.post))
            dispatch(setEditPost({ show: false, postId: null, postName: null }))
        } catch (err) {
            if(err.response){
                setError(err.response.data.message)
            }else{
                setError('Internal Server Error')
            }
        } finally {
            setLoading(false)
        }
    }

    console.log(form)

    useEffect(() => {
        if (postId) {
            setPostLoading(true)
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`/post/${postId}`)
                    const post = response.data.post
                    setForm({ ...form, caption: post.caption, image: post.image || '' })
                } catch (err) {
                    console.log(error)
                } finally {
                    setPostLoading(false)
                }
            }
            fetchPost()
        }
    }, [postId, dispatch, show])

    return (
        <Modal show={show} onHide={onClose}>
            {
                postLoading ? <Spinner /> :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Post {postName && postName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {error && <Alert variant="danger" dismissible>
                                <p>
                                    {error}
                                </p>
                            </Alert>}
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control style={{ height: 'auto', border: 'none' }} className='shadow-none scroll' type="text" as='textarea' value={form.caption} id='caption' name='caption' placeholder="What's on your mind?" onChange={(e) => setForm({ ...form, caption: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    {form.image &&
                                        <>
                                            <div style={{ fontSize: '20px', margin: '10px' }} className='d-flex gap-2 align-items-center'>
                                                <Form.Check style={{ fontSize: '26px' }} isInvalid onChange={(e) => { setForm({ ...form, removeImage: e.target.checked }) }} />
                                                Remove image
                                            </div>
                                            <Image src={`${import.meta.env.VITE_BACKEND_URL}/images/posts/${form.image}`} fluid />
                                        </>}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onClose}>
                                Close
                            </Button>
                            <Button disabled={(!form.caption || loading)} variant="primary" onClick={onSubmit}>
                                {loading ? 'Loading...' : 'Edit'}
                            </Button>
                        </Modal.Footer>
                    </>
            }
        </Modal>
    )
}

export default PostEditModal
