import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    postId: null,
    show: false,
    postName: null
}

const deletePostSlice = createSlice({
    name: 'deletePost',
    initialState,
    reducers: {
        setDeletePost(state, action){
            state.postId = action.payload.postId
            state.show = action.payload.show
            state.postName = action.payload.postName
        }
    }
})

export const { setDeletePost } = deletePostSlice.actions

export default deletePostSlice.reducer