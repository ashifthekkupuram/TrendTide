import mongoose from "mongoose";

const Schema = mongoose.Schema

const PostSchema = new Schema({
    caption: {
        type: String,
        minLength: 1
    },
    image: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }
},{ timestamps: true })

export default mongoose.model('Post', PostSchema)