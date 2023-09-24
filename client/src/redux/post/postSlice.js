import { createSlice } from "@reduxjs/toolkit";
import { createPost, getAllPosts, postViews } from './postActions'
const initialState = {
    post: {},
    posts: [],
    status: 'idle',
    error: null,
    postLoading: false

}


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state, action) => {
            state.status = 'loading'
            state.postLoading = true
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.postLoading = false
            state.post = action.payload
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.status = 'failed'
            state.postLoading = false
            state.error = action.payload
        })

        builder.addCase(getAllPosts.pending, (state, action) => {
            state.status = 'loading'

        })
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.posts = action.payload
        })
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })

        builder.addCase(postViews.pending, (state, action) => {
            state.status = 'loading'

        })
        builder.addCase(postViews.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.posts = action.payload
        })
        builder.addCase(postViews.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })

    }
})


export default postSlice.reducer;