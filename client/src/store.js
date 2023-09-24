import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/auth/authSlice'
import postReducer from './redux/post/postSlice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})

export default store;