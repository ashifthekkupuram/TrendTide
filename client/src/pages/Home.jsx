import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

// import axios from '../api/axios'
import { fetchPosts } from '../redux/slice/postsSlice'
import Post from '../components/Post'

const Home = () => {

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchPost = async () => {
        const result = await dispatch(fetchPosts())
        if(!result.payload.success){
          setError(result.payload.message)
        }
        setLoading(false)
    }
    fetchPost()
  }, [])

  return (
    <Container className='d-flex flex-column justify-content-start align-items-center mt-4 gap-3'>
      {loading ? <Spinner />: error ? <h1 style={{fontSize: '50px', color: 'red'}}>{error}</h1> :
        <>
          { posts ? posts.map((item) => <Post key={item._id} post={item} />) : <h1 style={{fontSize: '50px', color: 'red'}}>There is no posts</h1> }
        </>
      }
    </Container>
  )
}

export default Home
