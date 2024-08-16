import express from 'express'

import { get_posts, get_post, create_post, post_like } from '../controllers/post.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import postImageUploader from '../utils/postImageUploader.js'

const Router = express.Router()

Router.get('/', get_posts)
Router.post('/', isAuthenticated, postImageUploader, create_post)

Router.get('/:postId', get_post)

Router.post('/like/:postId', isAuthenticated, post_like)

export default Router

