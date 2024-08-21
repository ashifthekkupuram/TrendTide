import jwt from 'jsonwebtoken'

import Post from '../models/post.model.js'
import Comment from '../models/comment.model.js'
import User from '../models/user.model.js'

export const get_comments = async (req, res, next) => {
    try{
        const { postId } = req.params

        const post = await Post.findById(postId)

        if(!post){
            return res.status(400).json({
                success: false,
                message: 'Post not found'
            })
        }

        const comments = await Comment.find({ post, }).populate('author', 'name profile').populate('likes', 'name profile')

        return res.status(200).json({
            success: true,
            message: 'Comments retrieved',
            comments,
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const create_comment = async (req, res, next) => {
    try{

        const { postId } = req.params
        const { text } = req.body
        
        if(!text.trim()){
            return res.status(400).json({
                success: false,
                message: 'Text must have a character'
            })
        }

        const post = await Post.findById(postId)

        if(!post){
            return res.status(400).json({
                success: false,
                message: 'Post not found'
            })
        }

        const user = await User.findById(jwt.decode(req.token).UserInfo._id)

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const comment = new Comment({
            post,
            text: text.trim(),
            author: user
        })

        await comment.save()

        return res.status(200).json({
            success: true,
            message: 'Comment created',
            comment
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}