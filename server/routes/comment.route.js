import express from 'express'

import { get_comments, create_comment, update_comment, delete_comment } from '../controllers/comment.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isCommenter from '../middlewares/isCommenter.js'
import isCommenterOrAuthor from '../middlewares/isCommenterOrAuthor.js'

const Router = express.Router()

Router.get('/:postId', get_comments)
Router.post('/:postId', isAuthenticated, create_comment)

Router.put('/:commentId', isAuthenticated, isCommenter, update_comment)
Router.delete('/:commentId', isAuthenticated, isCommenterOrAuthor, delete_comment)

export default Router