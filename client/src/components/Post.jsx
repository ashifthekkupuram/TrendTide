import React from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import { AiOutlineLike } from "react-icons/ai";

const Post = ({post}) => {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Header>
        <Container style={{fontSize: '20px', fontWeight: '600'}} className='d-flex align-items-center gap-2'>
        <Image style={{width: '36px'}} src={post.author.profile} className='rounded' />
        {post.author.name.firstName} {post.author.name.secondName}
        </Container>
      </Card.Header>
      { post.image && <Card.Img variant="top" src={`${import.meta.env.VITE_BACKEND_URL}/images/posts/${post.image}`} /> }
      <Card.Body>
        { post.caption && <Card.Title>{post.caption}</Card.Title> }
      </Card.Body>
      <Card.Footer>
        <Container style={{fontSize: '20px', fontWeight: '500'}} className='d-flex align-items-center gap-2'>
        <AiOutlineLike style={{fontSize: '26px'}} />
        {post.likes.length}
        </Container>
      </Card.Footer>
    </Card>
  )
}

export default Post
