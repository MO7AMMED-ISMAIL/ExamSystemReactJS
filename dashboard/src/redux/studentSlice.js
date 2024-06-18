import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    students: [],
    status: 'idle',
    error: null,
    success: false,
};

export const allStudent = createAsyncThunk(
    'students/fetchStudents',
    async (args,ThunkAPI) => {
        const {rejectWithValue} = ThunkAPI;
        try {
            const response = await axios.get('http://localhost:8000/api/students',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
});

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        reset: (state) => {
            state.students = [];
            state.status = 'idle';
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allStudent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(allStudent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.students = action.payload.data;
                state.success = true;
            })
            .addCase(allStudent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.success = false;
            })
    }
});

export const {reset} = studentSlice.actions;
export default studentSlice.reducer;