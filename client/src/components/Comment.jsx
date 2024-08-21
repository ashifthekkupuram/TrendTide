import React from 'react'
import { Card, Image } from 'react-bootstrap'

const Comment = ({comment}) => {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Header style={{ fontSize: '14px', border: 'none', backgroundColor: '#FFFFFF', marginBottom:'8px' }} className='d-flex align-items-center gap-2 p-0'>
            <Image style={{width: '32px', height: '32px'}} src={comment.author.profile} fluid/>
            { comment.author.name.firstName + ' ' + comment.author.name.secondName }
        </Card.Header>
        <Card.Text>
          { comment.text }
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Comment
