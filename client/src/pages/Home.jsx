import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

import axios from '../api/axios'
import Post from '../components/Post'

const Home = () => {

  const [posts, setPosts] = useState({ search: '', posts: [] })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/post')
        setPosts({...posts, posts: response.data.posts})
        // console.log(response.data.posts)
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
    fetchPosts()
  }, [])

  return (
    <Container className='d-flex flex-column justify-content-start align-items-center mt-4 gap-3'>
      {loading ? <Spinner />: error ? <h1 style={{fontSize: '50px', color: 'red'}}>{error}</h1> :
        <>
          { posts.posts ? posts.posts.map((item) => <Post key={item._id} post={item} />) : <h1 style={{fontSize: '50px', color: 'red'}}>There is not posts</h1> }
        </>
      }
    </Container>
  )
}

export default Home
