import express from 'express'

import { login, register, refresh, logout, verification_get, verification_post, verification_delete, reset_password_create, reset_password_get, reset_password_post } from '../controllers/auth.controller.js'

const Router = express.Router()

Router.post('/login', login)
Router.post('/register', register)
Router.post('/refresh', refresh)
Router.post('/logout', logout)

Router.get('/verify/:token', verification_get)
Router.post('/verify/:token', verification_post)
Router.delete('/verify/:token', verification_delete)

Router.post('/reset-create', reset_password_create)

Router.get('/reset/:token', reset_password_get)
Router.post('/reset/:token', reset_password_post)

export default Router