import express from 'express'

import { follow_user, get_profile } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express.Router()

Router.get('/profile/:userId', get_profile)
Router.post('/follow/:userId',isAuthenticated, follow_user)

export default Router