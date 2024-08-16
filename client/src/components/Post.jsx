import React, { useState } from 'react'
import { Card, Container, Image, Spinner  } from 'react-bootstrap'
import { AiOutlineLike, AiFillLike  } from "react-icons/ai";
import { useSelector } from 'react-redux'

import axios from '../api/axios'

const Post = ({post, posts, setPosts}) => {

  // const likeController = new AbortController()
  const { token, UserData } = useSelector((state) => state.auth)
  const [likeLoading, setLikeLoading] = useState(false)

  const onLike = async () => {
    setLikeLoading(true)
    try{
      const response = await axios.post(`/post/like/${post._id}`, {}, {headers: {
        authorization:`Bearer ${token}` 
      }})

      const updatedPost = posts.map(p => 
      {
        if(p._id === post._id){
          if(response.data.liked){
            return {...p, likes: [...p.likes, {_id: UserData._id, username: UserData.username, name: UserData.name, profile: UserData.profile}]}
          }else{
            return {...p, likes: p.likes.filter(like => like._id !== UserData._id)}
          }
        }
        return p
      }
      )
      setPosts(updatedPost)
      
    } catch(err) {
      if(err.response){
        console.log(err.response.data.message)
      }else{
        console.log('Internal Server Error')
      }
    } finally {
      setLikeLoading(false)
    }
  }

  const hasLiked = post.likes.some(like => like._id === UserData._id);

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
        {likeLoading ? <Spinner style={{width: '20px', height: '20px'}} /> :hasLiked ? <AiFillLike onClick={onLike} style={{fontSize: '26px'}} />  : <AiOutlineLike onClick={onLike} style={{fontSize: '26px'}} />}
        {post.likes.length}
        </Container>
      </Card.Footer>
    </Card>
  )
}

export default Post
