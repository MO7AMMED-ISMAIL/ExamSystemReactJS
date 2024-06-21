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

export const addStudent = createAsyncThunk(
    'students/addStudent',
    async (formData,ThunkAPI) => {
        const {rejectWithValue} = ThunkAPI;
        try {
            const response = await axios.post('http://localhost:8000/api/students',formData,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (id,ThunkAPI) => {
        const {rejectWithValue} = ThunkAPI;
        try{
            const response = await axios.delete(`http://localhost:8000/api/students/${id}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

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
            .addCase(addStudent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.students.push(action.payload);
                state.success = true;
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const {reset} = studentSlice.actions;
export default studentSlice.reducer;