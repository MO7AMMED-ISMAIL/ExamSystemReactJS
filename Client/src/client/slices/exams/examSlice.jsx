import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchExamsById} from '../../api/examApi';

export const fetchExams = createAsyncThunk(
    'exams/fetchExams',
    async (subjectId) => {
        const response = await fetchExamsById(subjectId);
        return response; 
    }
);

const examsSlice = createSlice({
    name: 'exams',
    initialState: {
        exams: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExams.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExams.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exams = action.payload;
            })
            .addCase(fetchExams.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default examsSlice.reducer;
