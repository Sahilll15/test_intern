import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios"; // Import Axios

import { toast } from 'react-toastify';
const host = 'http://localhost:4000/api/v1';


export const createPost = createAsyncThunk(
    'post/create',
    async ({ title, description, media }, { rejectWithValue }) => {

        try {
            const response = await axios.post(
                `api/v1/post/createPost`,
                {
                    title,
                    description,
                    media
                }
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
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
            toast.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getAllPosts = createAsyncThunk(
    'post/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `api/v1/post/getAllPosts`,
            );
            if (response.status === 200) {

                return response.data;
            } else {

                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);



export const postViews = createAsyncThunk(
    'post/views',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `api/v1/post/postViews/${id}`,
            );
            if (response.status === 200) {

                return response.data;
            } else {

                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

