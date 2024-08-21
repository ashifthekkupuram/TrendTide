import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../api/axios'

const initialState = []

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.get('/post')
            return response.data
        } catch (err) {
            if (err.response) {
                return rejectWithValue(err.response.data)
            }

            if (err.request) {
                return rejectWithValue({ success: false, message: 'Internal Server Error' })
            }

            return rejectWithValue({ success: false, message: err.message })
        }
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePost(state, action) {
            const updatedPost = action.payload;
            const index = state.findIndex(post => post._id === updatedPost._id);
            if (index !== -1) {
                state[index] = updatedPost;
            }
        },
        createPost(state, action) {
            state.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                return action.payload.posts
            })
            .addCase(fetchPosts.rejected, () => {
                return []
            })
    }
})

export const { updatePost, createPost } = postsSlice.actions

export default postsSlice.reducer