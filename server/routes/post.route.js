import express from 'express'

import { get_posts, get_post, create_post } from '../controllers/post.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import postImageUploader from '../utils/postImageUploader.js'

const Router = express.Router()

Router.get('/', get_posts)
Router.post('/', isAuthenticated, postImageUploader, create_post)

Router.get('/:postId', get_post)

export default Router

