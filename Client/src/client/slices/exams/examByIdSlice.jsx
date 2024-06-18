import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchExamById} from '../../api/examApi';


export const fetchExam = createAsyncThunk(
    'exams/fetchExam',
    async (examId) => {
        const response = await fetchExamById(examId);
        return response; 
    }
);


const examSlice = createSlice({
    name: 'exam',
    initialState: {
        exam:{},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExam.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exam = action.payload;
            })
            .addCase(fetchExam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default examSlice.reducer;
