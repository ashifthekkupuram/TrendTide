import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap'

import axios from '../api/axios'

const Profile = () => {

    const { userId } = useParams()

    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(false)
    const [userError, setUserError] = useState(null)

    const [postsLoading, setPostsLoading] = useState(false)
    const [postsError, setPostsError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await axios.get(`/profile/${userId}`)
                setUser(response.data.user)

            } catch (err) {

                if(err.response){
                    setUserError(err.response.data.error)
                }else{
                    setUserError('Internal Server Error')
                }

            } finally {
                setUserLoading(false)
            }
        }
        setUserLoading(true)
        fetchUser()
    }, [])

    return (
        <>
            <Container className='p-1'>
                {/* Profile Section  */}
                {userLoading ? (<Spinner />) :
                    userError ? <h1>{userError}</h1> : (
                    <>
                        <Row>
                            <Col className='d-flex justify-content-center align-items-center mb-1' sm>
                                <Image style={{ height: '400px' }} className='rounded-circle' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='profile' />
                            </Col>
                            <Col className='d-flex justify-content-evenly align-items-center' sm>
                                <Button variant='light' style={{ fontSize: '24px' }}>Posts 0</Button>
                                <Button variant='light' style={{ fontSize: '24px' }}>Followers {user?.followers.count()}</Button>
                                <Button variant='light' style={{ fontSize: '24px' }}>Following {user?.followers.count()}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <h1>Hello</h1>
                        </Row>
                    </>)}
                {/* Posts Section */}
            </Container>

        </>
    )
}

export default Profile
