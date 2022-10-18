import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params)=> {
    const { data } = await axios.post('/login', params);
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {

    }
})