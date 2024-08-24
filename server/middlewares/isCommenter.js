import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import Comment from '../models/comment.model.js'

const isCommenter = async (req, res, next) => {
    try{

        const { commentId } = req.params

        if(!commentId){
            return res.status(400).json({
                success: false,
                message: 'Comment ID required'
            })
        }

        const user = await User.findById(jwt.decode(req.token).UserInfo._id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const comment = await Comment.findById(commentId)

        if(!comment){
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            })
        }

        if(comment.author.toString() == user._id.toString()){
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

export default isCommenter