import React, { useState, useRef } from 'react'
import { Button, Modal, Form, Image } from 'react-bootstrap'
import { GrGallery } from "react-icons/gr";

const PostCreateModal = ({ showPostCreateModal, setShowPostCreateModal }) => {

    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)

    const ImageInputRef = useRef()

    const onClose = () => {
        setShowPostCreateModal(false)
    }

    const onChangeCaption = (e) => setCaption(e.target.value)
    const onChangeImage = (e) => setImage(e.target.files[0])

    return (
        <Modal show={showPostCreateModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control style={{ height: 'auto', border: 'none' }} className='shadow-none scroll' type="text" as='textarea' value={caption} id='caption' name='caption' placeholder="What's on your mind?" onChange={onChangeCaption} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control ref={ImageInputRef} style={{ display: 'none' }} className='' type="file" id='image' name='image' onChange={onChangeImage} />
                        { image ? 
                        <>
                            {/* <Image src={} /> */}
                        </> : 
                        <>
                            <Button variant='success' onClick={() => {ImageInputRef.current.click()}} ><GrGallery />  Image</Button>
                        </> }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onClose}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PostCreateModal
