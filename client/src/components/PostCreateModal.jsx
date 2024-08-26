import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Image, Alert } from 'react-bootstrap'
import { GrGallery } from "react-icons/gr";

import axios from '../api/axios';
import { createPost } from '../redux/slice/postsSlice'

const PostCreateModal = ({ showPostCreateModal, setShowPostCreateModal }) => {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    const { token } = useSelector( (state) => state.auth )

    const ImageInputRef = useRef()

    const onClose = () => {
        setShowPostCreateModal(false)
    }

    const onChangeCaption = (e) => setCaption(e.target.value)
    const onChangeImage = (e) => {
        const file = setImage(e.target.files[0])
        if(file){
            setImage(file)
        }
    }
    const onRemoveImage = () => {
        if(ImageInputRef.current){
            ImageInputRef.current.value = null
            setImage(null)
        }
    }

    const TriggerFileInput = () => {
        if(ImageInputRef.current){
            ImageInputRef.current.click()
        }
    }

    const onSubmit = async () => {
        setLoading(true)
        setError(null)
        try{
            const formData = new FormData()

            if(caption) formData.append('caption', caption)
            if(image) formData.append('image',image)
            

            const response = await axios.post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${token}`
                }
            })

            dispatch(createPost(response.data.post))

            setShowPostCreateModal(false)

            setCaption('')
            setImage(null)
            ImageInputRef.current.value = null

        } catch(err) {

            if(err.response){
                setError(err.response.data.message)
            }else{
                setError('Internal Server Error')
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal show={showPostCreateModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {error && <Alert variant="danger" dismissible>
                                <p>
                                    {error}
                                </p>
                            </Alert>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control style={{ height: 'auto', border: 'none' }} className='shadow-none scroll' type="text" as='textarea' value={caption} id='caption' name='caption' placeholder="What's on your mind?" onChange={onChangeCaption} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-column">
                        <Form.Control ref={ImageInputRef} style={{ display: 'none' }} className='' type="file" id='image' name='image' onChange={onChangeImage} />
                        { image ? 
                        <>
                            <Image src={URL.createObjectURL(image)} fluid/>
                            <Button style={{marginTop: '3px', width: '150px'}} variant='danger' onClick={onRemoveImage} >Remove Image</Button>
                        </> : 
                        <>
                            <Button className='d-flex justify-content-center align-items-center gap-2' variant='success' onClick={TriggerFileInput} ><GrGallery />Image</Button>
                        </> }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button disabled={(!caption && !image || loading)} variant="primary" onClick={onSubmit}>
                    { loading ? 'Loading...' : 'Create' }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PostCreateModal
