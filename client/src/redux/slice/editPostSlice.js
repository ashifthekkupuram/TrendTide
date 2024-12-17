import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    postId: null,
    show: false,
    postName: null
}

const editPostSlice = createSlice({
    name: 'editPost',
    initialState,
    reducers: {
        setEditPost(state, action){
            state.postId = action.payload.postId
            state.show = action.payload.show
            state.postName = action.payload.postName
        }
    }
})

export const { setEditPost } = editPostSlice.actions

export default editPostSlice.reducer