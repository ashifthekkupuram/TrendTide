import React,{ useState } from 'react'
import { Card, Image,Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { follow } from '../redux/slice/authSlice'

const ProfileCard = ({ user }) => {

    const dispatch = useDispatch()
    const { token, UserData } = useSelector((state) => state.auth)

    const [followLoading, setFollowLoading] = useState(false)

    const isFollowing = UserData?.followings?.some(following => following._id === user._id) || false;

    const onFollow = async (e) => {
        setFollowLoading(true)
        await dispatch(follow({ userId: user._id, token }))
        setFollowLoading(false)
      }

  return (
    <Card className='d-flex flex-row justify-content-between align-items-center p-2'>
        <div className='d-flex flex-row align-items-center'>
            <Image style={{height: '45px', width: '45px', marginRight: '8px'}} src={user?.profile} />
            <h5 style={{margin: 0}}>{user?.name.firstName} {user?.name.secondName}</h5>
        </div>
        {( token && (UserData?._id != user._id) && (isFollowing ? <Badge onClick={!followLoading ? onFollow : undefined}
            style={{ pointerEvents: followLoading ? 'none' : 'auto', opacity: followLoading ? 0.6 : 1 }} bg='danger'>{followLoading ? 'Loading..' : 'unfollow'} </Badge> : <Badge onClick={!followLoading ? onFollow : undefined}
              style={{ pointerEvents: followLoading ? 'none' : 'auto', opacity: followLoading ? 0.6 : 1 }} bg='secondary'>{followLoading ? 'Loading..' : 'follow'}</Badge>) )}
    </Card>
  )
}

export default ProfileCard
