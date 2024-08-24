import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import postsSlice from './slice/postsSlice'
import commentsSlice from './slice/commentsSlice'
import editPostSlice from './slice/editPostSlice'
import deletePostSlice from './slice/deletePostSlice'


export const store = configureStore({
    reducer: {
       auth: authReducer,
       posts: postsSlice,
       comments: commentsSlice,
       editPost: editPostSlice,
       deletePost: deletePostSlice,
    }
})