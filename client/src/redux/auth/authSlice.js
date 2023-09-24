import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser, isAuthenticated } from './authActions'


const initialState = {
    user: null,
    isAuth: false,
    status: 'idle',
    error: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.user = action.payload
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })

        builder.addCase(loginUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.user = action.payload
            state.isAuth = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })

        builder.addCase(isAuthenticated.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(isAuthenticated.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.isAuth = true
        })
        builder.addCase(isAuthenticated.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })

        builder.addCase(logoutUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.isAuth = false
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })



    }
})

export default authSlice.reducer;