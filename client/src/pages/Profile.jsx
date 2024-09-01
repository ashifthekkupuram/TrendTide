import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import axios from '../api/axios'
import FollowListModal from '../components/FollowListModal'
import Post from '../components/Post'
import { fetchPosts } from '../redux/slice/postsSlice'

const Profile = () => {

    const dispatch = useDispatch()

    const { userId } = useParams()
    const { token, UserData } = useSelector((state) => state.auth)
    const posts = useSelector((state) => state.posts)

    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(false)
    const [userError, setUserError] = useState(null)
    const [postsCount, setPostsCount] = useState(0)

    const [showModal, setShowModal] = useState({
        show: false,
        title: ''
    })

    const [postsLoading, setPostsLoading] = useState(false)
    const [postsError, setPostsError] = useState(null)

    const postsSectionRef = useRef()

    const ScrollDown = () => {
        postsSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }


    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await axios.get(`/user/profile/${userId}`)
                setUser(response.data.user)
                setPostsCount(response.data.posts_count)
            } catch (err) {

                if (err.response) {
                    setUserError(err.response.data.message)
                } else {
                    setUserError('Internal Server Error')
                }

            } finally {
                setUserLoading(false)
            }
        }
        const fetchPostss = async () => {
            const result = await dispatch(fetchPosts({userId}))
            if (!result.payload.success) {
                setPostsError(result.payload.message)
            }
            setPostsLoading(false)
        }
        setUserLoading(true)
        fetchUser()
        setPostsLoading(true)
        fetchPostss()
    }, [userId])

    return (
        <>
            <Container className='d-flex flex-column gap-2 p-1'>
                {/* Profile Section  */}
                <Container className='d-flex flex-column bg-secondary p-5 rounded'>
                {userLoading ? (<div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <Spinner animation="border" />
                </div>) :
                    userError ? <h1 className='text-danger text-center'>{userError}</h1> : (
                        <>
                            <Row>
                                <Col className='d-flex justify-content-center align-items-center mb-1' sm>
                                    <Image style={{ height: '400px' }} className='rounded-circle' src={user?.profile} alt='profile' />
                                </Col>
                                <Col className='d-flex justify-content-evenly align-items-center' sm>
                                    <Button onClick={ScrollDown} variant='light' style={{ fontSize: '24px' }}>Posts {postsCount}</Button>
                                    <Button onClick={() => setShowModal({ show: true, title: 'Followers' })} variant='light' style={{ fontSize: '24px' }}>Followers {user?.followers.length}</Button>
                                    <Button onClick={() => setShowModal({ show: true, title: 'Following' })} variant='light' style={{ fontSize: '24px' }}>Followings {user?.followings.length}</Button>
                                </Col>
                            </Row>
                            <Container className='p-5'>
                                <h1>{user?.name?.firstName} {user?.name?.secondName}</h1>
                                {(user?.DOB && !user?.DOB?.private) && user?.DOB?.date}
                            </Container>
                        </>)}
                </Container>
                {/* Posts Section */}
                <Container ref={postsSectionRef} className='d-flex flex-column gap-2'>
                    {postsLoading ? <Spinner /> : postsError ? <h1 style={{ fontSize: '50px', color: 'red' }}>{postsError}</h1> :
                        <>
                            {posts.length > 0 ? posts.map((item) => <Post key={item._id} post={item} />) : <h1 style={{ fontSize: '50px' }}>There is no posts</h1>}
                        </>
                    }
                </Container>
            </Container>
            <FollowListModal showModal={showModal} setShowModal={setShowModal} followers={user?.followers} followings={user?.followings} />
        </>
    )
}

export default Profile
