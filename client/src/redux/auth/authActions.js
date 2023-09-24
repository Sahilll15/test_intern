import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios
import { toast } from 'react-toastify';



export const registerUser = createAsyncThunk(
    'user/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `api/v1/auth/register/`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                return response.data.user;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `api/v1/auth/login/`,
                {
                    email: user.email,
                    password: user.password,
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                return response.data;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`api/v1/auth/logout/`);

            if (response.status === 200) {
                toast.success(response.data.message);
                return response.data;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const isAuthenticated = createAsyncThunk(
    'user/isAuthenticated',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`api/v1/auth/isAuthenticated/`);

            if (response.status === 200) {
                toast.success(response.data.message);
                return response.data;
            } else {
                toast.error(response.data.message);
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);



