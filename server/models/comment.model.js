import mongoose from "mongoose";

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        minLength: 1
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true })

export default mongoose.model('Comment', CommentSchema)