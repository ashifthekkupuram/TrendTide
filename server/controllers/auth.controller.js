import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import Verification from '../models/verification.model.js'
import ResetPassword from '../models/resetPassword.model.js'
import transporter from '../utils/sendEmail.js'

dotenv.config()

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY

export const login =  async (req, res, next) => {
    try{
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Must provide user credentails'
            })
        }

        const user = await User.findOne({ email }).populate('name')

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials',
            })
        }

        const match = bcrypt.compareSync(password, user.password)

        if(!match){
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials'
            })
        }

        if(!user.verified){
            return res.status(400).json({
                success: false,
                message: 'Account not verified'
            })
        }

        const accessToken = jwt.sign({
            'UserInfo': {
                _id: user._id,
                email: user.email,
                username: user.username,
                name: user.name
            }
        }, ACCESS_SECRET_KEY, {expiresIn: '5m'} )

        const refreshToken = jwt.sign({ _id: user._id }, REFRESH_SECRET_KEY, {expiresIn: '1d'})

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        return res.json({
            success: true,
            message: 'Logged in successfully',
            accessToken,
            userData: {
                _id: user._id,
                email: user.email,
                username: user.username,
                profile: user.profile,
                name: user.name,
                followers: user.followers.map(follower => ({
                    _id: follower._id,
                    username: follower.username,
                    name: follower.name,
                    profile: follower.profile
                })),
                followings: user.followings.map(following => ({
                    _id: following._id,
                    username: following.username,
                    name: following.name,
                    profile: following.profile
                }))
            }
        })

    }catch(err){
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const register = async (req, res, next) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(406).json({
                success: false,
                message: 'Email and password required'
            })
        }

        const emailExist = await User.findOne({ email: email.toLowerCase() })

        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: 'Account with email already exist'
            })
        }

        if (!email.toLowerCase().match(EMAIL_REGEX)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email ID'
            })
        }

        if (!password.match(PASSWORD_REGEX)) {
            return res.status(400).json({
                success: false,
                message: 'Password should at least 8 characters long, contains at least one letter and one digit, and includes no whitespace, allowing for special characters'
            })
        }

        bcrypt.hash(password, 12, async (err, hashedPassword) => {
            if (!err) {
                const user = new User({
                    email: email.toLowerCase(),
                    password: hashedPassword
                })

                const verification = new Verification({
                    user,
                })

                await verification.save()

                await user.save()

                await transporter.sendMail({
                    from: `"Trend Tide" <${process.env.EMAIL}>`, // sender address
                    to: user.email, // list of receivers
                    subject: "Account Verification", // Subject line
                    text: "Verify your account or Delete your account if it's not you", // plain text body
                    html: `<h1><a href="${process.env.FRONTEND_URL}/verification/${verification.token}" >Click Here</a></h1>`, // html body
                  });

                return res.status(200).json({
                    success: true,
                    message: 'User has been created. Check your email for Verification!'
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Something went wrong",
                    error: err
                })
            }
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const refresh = async (req, res, next) => {
    try {
        
        const cookies = req.cookies

        if(!cookies?.jwt){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const refreshToken = cookies.jwt

        jwt.verify(
            refreshToken,
            REFRESH_SECRET_KEY,
            async (err, decoded) => {

                if(err){
                    return res.status(403).json({
                        success: false,
                        message: 'Forbidden'
                    })
                }

                const foundUser = await User.findById(decoded._id).populate('name')

                if(!foundUser){
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized'
                    })
                }

                const accessToken = jwt.sign(
                    { "UserInfo": {
                        _id: foundUser._id,
                        email: foundUser.email,
                        username: foundUser.username,
                        name: foundUser.name
                    } },
                    ACCESS_SECRET_KEY,
                    {expiresIn: '5m'}
                )

                return res.json({
                    success: true,
                    accessToken,
                    userData: {
                        _id: foundUser._id,
                        email: foundUser.email,
                        username: foundUser.username,
                        profile: foundUser.profile,
                        name: foundUser.name,
                        followers: foundUser.followers.map(follower => ({
                            _id: follower._id,
                            username: follower.username,
                            name: follower.name,
                            profile: follower.profile
                        })),
                        followings: foundUser.followings.map(following => ({
                            _id: following._id,
                            username: following.username,
                            name: following.name,
                            profile: following.profile
                        }))
                    }
                })

            }
        )

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const logout = async (req, res, next) => {
    try {
        
        const cookies = req.cookies

        if(!cookies?.jwt) return res.sendStatus(204)
        
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })

        res.json({success: true, message: 'Cookie cleared'})

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const verification_get = async (req, res, next) => {
    try{

        const { token } = req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Verification token is required",
            })
        }

        const verification = await Verification.findOne({token})

        if(!verification){
            return res.status(400).json({
                success: false,
                message: "Verification not found",
            })
        }

        if(verification.expired){
            return res.status(400).json({
                success: false,
                message: "Expired",
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Verification is not expired'
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const verification_post = async (req, res, next) => {
    try{

        const { token } = req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Verification token is required",
            })
        }

        const verification = await Verification.findOne({token})

        if(!verification){
            return res.status(400).json({
                success: false,
                message: "Verification not found",
            })
        }

        if(verification.expired){
            return res.status(400).json({
                success: false,
                message: "Expired",
            })
        }

        const user = await User.findById(verification.user)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            }) 
        }

        await User.findByIdAndUpdate(verification.user, { verified: true })

        await Verification.updateMany({ user: verification.user }, { expired: true })

        return res.status(200).json({
            success: true,
            message: 'Account Activated'
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const verification_delete = async (req, res, next) => {
    try{

        const { token } = req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Verification token is required",
            })
        }

        const verification = await Verification.findOne({token})

        if(!verification){
            return res.status(400).json({
                success: false,
                message: "Verification not found",
            })
        }

        if(verification.expired){
            return res.status(400).json({
                success: false,
                message: "Expired",
            })
        }

        const user = await User.findById(verification.user)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            }) 
        }

        await User.findByIdAndDelete(verification.user)

        await Verification.updateMany({ user: verification.user }, { expired: true })

        return res.status(200).json({
            success: true,
            message: 'Account Deleted'
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const reset_password_create = async (req, res, next) => {
    try{

        const { email } = req.body

        const user = await User.findOne({email: email.toLowerCase()})

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Account with email does not exist'
            })
        }

        await ResetPassword.updateMany({user}, { expired: true })

        const reset_password = new ResetPassword({
            user,
        })

        await reset_password.save()

        await transporter.sendMail({
            from: `"Trend Tide" <${process.env.EMAIL}>`, // sender address
            to: user.email, // list of receivers
            subject: "Account Reset Password", // Subject line
            text: "Click here to reset your password", // plain text body
            html: `<h1><a href="${process.env.FRONTEND_URL}/reset-confirm-password/${reset_password.token}" >Click Here</a></h1>`, // html body
          });

        return res.status(200).json({
            success: true,
            message: 'Check your email to reset password!'
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const reset_password_get = async (req, res, next) => {
    try{

        const { token } = req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Reset password token is required",
            })
        }

        const reset_password = await ResetPassword.findOne({token})

        if(!reset_password){
            return res.status(400).json({
                success: false,
                message: "reset password not found",
            })
        }

        if(reset_password.expired){
            return res.status(400).json({
                success: false,
                message: "Expired",
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Not expired'
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const reset_password_post = async (req, res, next) => {
    try{

        const { token } = req.params
        const { password } = req.body

        if(!token){
            return res.status(400).json({
                success: false,
                message: "Reset password token is required",
            })
        }

        const reset_password = await ResetPassword.findOne({token})

        if(!reset_password){
            return res.status(400).json({
                success: false,
                message: "reset password not found",
            })
        }

        if(reset_password.expired){
            return res.status(400).json({
                success: false,
                message: "Expired",
            })
        }

        const user = await User.findById(reset_password.user)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            }) 
        }

        if(!password.match(PASSWORD_REGEX)){
            return res.status(406).json({
                success: false,
                message: 'Password should at least 8 characters long, contains at least one letter and one digit, and includes no whitespace, allowing for special characters.',
            }) 
        }

        bcrypt.hash(password, 12, async (err, hashedPassword) => {
            if (!err) {

                await User.findByIdAndUpdate(reset_password.user, {password: hashedPassword})

                await ResetPassword.updateMany({ user: reset_password.user }, { expired: true })

                return res.status(200).json({
                    success: true,
                    message: 'Password has been updated'
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Something went wrong",
                    error: err
                })
            }
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}