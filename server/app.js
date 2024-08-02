import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { CONNECT_DB } from './utils/database.js';
import corsOptions from './config/corsOptions.js';

import AuthRouter from './routes/auth.route.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app =  express()

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

CONNECT_DB()

app.use('/api/auth', AuthRouter)

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})