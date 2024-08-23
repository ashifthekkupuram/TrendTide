import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import Post from '../models/post.model.js'

const isAuthor = async (req, res, next) => {
    try{

        const { postId } = req.params

        const user = await User.findById(jwt.decode(req.token).UserInfo._id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        console.log(user)
        console.log(post)

        if(post.author.toString() == user._id.toString()){
            next()
        }else{
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
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

export default isAuthor