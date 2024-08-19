import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import postsSlice from './slice/postsSlice'

export const store = configureStore({
    reducer: {
       auth: authReducer,
       posts: postsSlice 
    }
})