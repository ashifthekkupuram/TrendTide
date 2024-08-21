import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import postsSlice from './slice/postsSlice'
import commentsSlice from './slice/commentsSlice'


export const store = configureStore({
    reducer: {
       auth: authReducer,
       posts: postsSlice,
       comments: commentsSlice
    }
})