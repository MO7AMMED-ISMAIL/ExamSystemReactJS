import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const login = createAsyncThunk('auth/login',
    async ({ email, password },ThunkAPI) => {
        const {rejectWithValue} = ThunkAPI;
        try {
            const response = await axios.post('http://localhost:8000/api/login',
                { email, password });
            const token = response.data.token;
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000;
            const id = decodedToken.id;
            return {token, role: response.data.role, expirationTime,id};
        }catch(error){
            return rejectWithValue("Email or password is incorrect");
        }
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        role: null,
        expirationTime: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.role = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.expirationTime = action.payload.expirationTime;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
