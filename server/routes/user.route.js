import express from 'express'

import { follow_user } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express.Router()

Router.post('/follow/:userId',isAuthenticated, follow_user)

export default Router