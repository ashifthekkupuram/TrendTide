import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

import axios from "../../api/axios";

const initialState = {
    comments: [],
    showComments: false,
    postId: ''
}

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (credentials, { rejectWithValue }) => {
        try{
            const response = await axios.get(`/comment/${credentials.postId}`)
            console.log(response.data)
            return response.data
        } catch (err) {
            if(err.response) {
                return rejectWithValue(err.response.data)
            }

            if(err.request) {
                return rejectWithValue({ success: false, message: 'Internal Server Error' })
            }

            return rejectWithValue({ success: false, message: err.message })
        }
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment(state, action) {
            state.comments.push(action.payload)
        },
        showModal(state, action) {
            state.showComments = action.payload.showComments
            state.postId = action.payload.postId
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload.comments
        })
        .addCase(fetchComments.rejected, (state) => {
            state.comments = []
        })
    }
})

export const { addComment, showModal } = commentsSlice.actions

export default commentsSlice.reducer