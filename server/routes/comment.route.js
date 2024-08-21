import express from 'express'

import { get_comments, create_comment } from '../controllers/comment.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express.Router()

Router.get('/:postId', get_comments)
Router.post('/:postId', isAuthenticated, create_comment)

export default Router