import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDegree } from '../../api/addDegree'; 


export const addDegreeAsync = createAsyncThunk(
    'degrees/addDegree',
    async ({ student, exam, degree }) => {
        try {
            const data = await addDegree(student, exam, degree);
            return data;
        } catch (error) {
            throw error;
        }
    }
);


const degreesSlice = createSlice({
    name: 'degrees',
    initialState : {
        degrees: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addDegreeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDegreeAsync.fulfilled, (state, action) => {
                state.degrees.push(action.payload);
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(addDegreeAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default degreesSlice.reducer;
