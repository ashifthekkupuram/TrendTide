import jwt from 'jsonwebtoken'

import Post from '../models/post.model.js'
import User from '../models/user.model.js'

export const get_posts = async (req, res, next) => {
    try{

        const posts = await Post.find({}).populate('author', 'name username profile').populate('likes', 'name username profile').sort('-createdAt')

        return res.status(200).json({
            success: true,
            message: 'Posts retrieved',
            posts
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const get_post = async (req, res, next) => {
    try{

        const { postId } = req.params

        const post = await Post.findById(postId).populate('author', 'name username profile')

        if(!post){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Post retrieved',
            post
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const create_post = async (req, res, next) => {
    try{

        const { caption } = req.body
        const image = req.file

        if( !image && !caption.trim() ){
            return res.status(400).json({
                success: false,
                message: 'Caption or Image is required'
            })
        }

        const user = await User.findById(jwt.decode(req.token).UserInfo._id)

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User is not found'
            })
        }

        const postData = {}

        if(caption){
            postData.caption = caption
        }

        if(image){
            postData.image = image.filename
        }

        const post = new Post({
            ...postData,
            author: user
        })

        await post.save()

        return res.status(200).json({
            success: true,
            message: 'Post created'
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const post_like = async (req, res, next) => {
    try{

        const { postId } = req.params

        const post = await Post.findById(postId).populate('likes', 'username name profile')

        const user = await User.findById(jwt.decode(req.token).UserInfo._id)

        if(!post){
            return res.status(400).json({
                success: false,
                message: 'User is not found'
            })
        }

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User is not found'
            })
        }

        if(post.likes.includes(user._id)){
            post.likes.pull(user._id)
            await post.save()

            return res.status(200).json({
                success: true,
                message: 'Post unliked successfully',
                liked: false,
            })
        }else{
            post.likes.push(user._id)
            await post.save()

            return res.status(200).json({
                success: true,
                message: 'Post likes successfully',
                liked: true
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
