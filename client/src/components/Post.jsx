import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Container, Image, Spinner, Dropdown, Badge } from 'react-bootstrap'
import { AiOutlineLike, AiFillLike  } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";

import axios from '../api/axios'
import { updatePost } from '../redux/slice/postsSlice';
import { showModal } from '../redux/slice/commentsSlice';
import { setDeletePost } from '../redux/slice/deletePostSlice';
import { setEditPost } from '../redux/slice/editPostSlice';
import { follow } from '../redux/slice/authSlice'

const Post = ({ post }) => {

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const { token, UserData } = useSelector((state) => state.auth)

  const [likeLoading, setLikeLoading] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  const onLike = async () => {
    setLikeLoading(true)
    try{
      const response = await axios.post(`/post/like/${post._id}`, {}, {headers: {
        authorization:`Bearer ${token}` 
      }})

      const updatedPost = {
        ...post,
        likes: response.data.liked
          ? [...post.likes, { name: UserData.name, _id: UserData._id, username: UserData.username, profile: UserData.profile }]
          : post.likes.filter(like => like._id !== UserData._id)
      };

      dispatch(updatePost(updatedPost))
      
    } catch(err) {
      if(err.response){
        console.log(err.response.data.message)
      }else{
        console.log('Internal Server Error')
        console.log(err)
      }
    } finally {
      setLikeLoading(false)
    }
  }

  const onFollow = async (e) => {
    setFollowLoading(true)
    await dispatch(follow({userId: post.author._id, token}))
    setFollowLoading(false)
  }

  const onCommentClick = (e) => {
    dispatch(showModal({showComments: true, postId: post._id}))
  }

  const onDeletePostClick = (e) => {
    dispatch(setDeletePost({ show: true, postId: post._id, postName: post.caption }))
  }

  const onEditPostClick = (e) => {
    dispatch(setEditPost({ show: true, postId: post._id, postName: post.caption }))
  }

  const hasLiked = post.likes.some(like => like._id === UserData._id);
  const isFollowing = UserData?.followings.some(following => following._id === post.author._id);

  return (
    <Card style={{ width: '100%' }}>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <Container style={{fontSize: '20px', fontWeight: '600'}} className='d-flex align-items-center gap-2'>
        <Image style={{width: '36px'}} src={post.author.profile} className='rounded' />
        {post.author.name.firstName} {post.author.name.secondName}
        { (UserData?._id != post.author._id) && ( isFollowing ? <Badge bg='danger' onClick={onFollow}>{followLoading ? 'Loading..': 'unfollow'} </Badge> : <Badge bg='secondary' onClick={onFollow}>{followLoading ? 'Loading..': 'follow'}</Badge> )}
        </Container>
        { (UserData._id == post.author._id) && <Dropdown>
          <Dropdown.Toggle className='' variant="link" id="dropdown-basic">
          •••
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={onEditPostClick}>Edit Post</Dropdown.Item>
            <Dropdown.Item onClick={onDeletePostClick}>Delete Post</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> }
      </Card.Header>
      { post.image && <Card.Img variant="top" src={`${import.meta.env.VITE_BACKEND_URL}/images/posts/${post.image}`} /> }
      <Card.Body>
        { post.caption && <Card.Title>{post.caption}</Card.Title> }
      </Card.Body>
      <Card.Footer>
        <Container style={{fontSize: '20px', fontWeight: '500'}} className='d-flex align-items-center gap-2'>
        {likeLoading ? <Spinner style={{width: '20px', height: '20px'}} /> :hasLiked ? <AiFillLike onClick={onLike} style={{fontSize: '26px'}} role='button' />  : <AiOutlineLike onClick={onLike} style={{fontSize: '26px'}} role='button' />}
        {post.likes.length}
        <MdOutlineModeComment style={{marginLeft: '5px',fontSize: '26px'}} onClick={onCommentClick} />
        </Container>
      </Card.Footer>
    </Card>
  )
}

export default Post
