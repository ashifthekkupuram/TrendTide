import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

export const get_profile = async (req, res, next) => {
    try{

        const { userId } = req.params

        const user = await User.findById(userId, 'username name profile DOB').populate('followers followings','name profile username')

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User retreived',
            user
        })

    } catch(err) {

        res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const follow_user = async (req, res, next) => {
    try{

        const { userId } = req.params

        const [user ,followUser] = await Promise.all([
            User.findById(jwt.decode(req.token).UserInfo._id),
            User.findById(userId)
        ])

        if(!user || !followUser){
            return res.status(400).json({
                success: false,
                message: 'Users not found'
            })
        }

        if(user._id.equals(followUser._id)){
            return res.status(400).json({
                success: false,
                message: 'You cannot follow yourself'
            })
        }

        const isFollowing = user.followings.some(f => f._id.equals(followUser._id));

        if(isFollowing){

            user.followings = user.followings.filter(f => !f._id.equals(followUser._id))
            followUser.followers = followUser.followers.filter(f => !f._id.equals(user._id))

            await Promise.all([user.save(), followUser.save()])

            return res.status(200).json({
                success: true,
                message: 'Unfollowed user',
                followed: false,
                userId: userId
            })

        }else{

            user.followings.push({
                _id: followUser._id,
                username: followUser.username,
                name: followUser.name,
                profile: followUser.profile,
            })

            followUser.followers.push({
                _id: user._id,
                username: user.username,
                name: user.name,
                profile: user.profile,
            })

            await Promise.all([user.save(), followUser.save()]);

            return res.status(200).json({
                success: true,
                message: 'followed user',
                followed: true,
                user: {
                    _id: followUser._id,
                    username: followUser.username,
                    name: followUser.name,
                    profile: followUser.profile,
                }
            })

        }

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}