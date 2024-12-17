import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fs from 'fs'
import path from "path"

import { CONNECT_DB } from './utils/database.js'
import corsOptions from './config/corsOptions.js'
import { getDirName } from './utils/getDirName.js'

import AuthRouter from './routes/auth.route.js'
import PostRouter from './routes/post.route.js'
import CommentRouter from './routes/comment.route.js'
import UserRouter from './routes/user.route.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app =  express()

const __dirname = getDirName(import.meta.url);

const uploadsDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/images", express.static(uploadsDir));

CONNECT_DB()

app.use('/api/auth', AuthRouter)
app.use('/api/post', PostRouter)
app.use('/api/comment', CommentRouter)
app.use('/api/user', UserRouter)

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})