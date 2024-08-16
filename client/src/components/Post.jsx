import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Post = ({post}) => {
  return (
    <Card style={{ width: '18rem' }}>
      { post.image && <Card.Img variant="top" src={`${import.meta.env.VITE_BACKEND_URL}/images/posts/${post.image}`} /> }
      <Card.Body>
        { post.caption && <Card.Title>{post.caption}</Card.Title> }
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default Post
