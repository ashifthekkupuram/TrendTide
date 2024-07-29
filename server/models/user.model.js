import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema

const GENDERS = ['Male', 'Female', 'Others']
const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png'
const NAMES = ['Boba Fett', 'Mace Windu', 'Anakin Skywalker', 'Darth Vadar', 'Darth Sidius', 'Darth Maul', 'Darth Bane', 'Luke Skywalker', 'Han Solo', 'Obiwan Kenobi', 'Count Dooku', 'Padme Amidala', 'Jango Fett']

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 4,
        maxLength: 25
    },
    name: {
        fristName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 25
        },
        secondName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 25
        }
    },
    gender: {
        type: String,
        enum: GENDERS,
        default: 'Male'
    },
    profile: {
        type: String,
        default: DEFAULT_IMAGE
    },
    DOB: {
        date: {
            type: Date
        },
        private: {
            type: Boolean,
            default: false
        }
    },
    verfied: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})

UserSchema.pre('save', async function(next){
    const user = this

    if (!user.isModified('email')) return next()

    try{
        const baseUsername = user.email.split('@')[0]
        const name = NAMES[(Math.floor(Math.random() * NAMES.length))]
        let username = baseUsername
        let counter = 1

        user.name.fristName =  name.split(' ')[0]
        user.name.secondName =  name.split(' ')[1]

        const User = mongoose.model('User', UserSchema);

        while(await User.exists({ username })){
            username = `${baseUsername}${counter}`
            counter++
        }

        user.username = username
        next()

    }catch(err){
        next(err)
    }

})

export default mongoose.model('User', UserSchema)