import React from 'react'
import { Modal } from 'react-bootstrap'

import ProfileCard from './ProfileCard'

const FollowListModal = ({showModal, setShowModal, followers, followings}) => {

    const handleClose = () => {
        setShowModal({show: false, title: ''})
    }

  return (
    <Modal show={showModal.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{showModal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { (showModal.title) && (showModal.title === 'Followers' ? followers.map((follow) => <ProfileCard key={follow._id} user={follow} />) : followings.map((follow) => <ProfileCard key={follow._id} user={follow} />) ) }
        </Modal.Body>
      </Modal>
  )
}

export default FollowListModal
