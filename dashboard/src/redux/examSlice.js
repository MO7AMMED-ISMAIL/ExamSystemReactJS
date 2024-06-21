import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createExam, deleteExam as deleteExamApi, getAllExams, getExamById, updateExam } from '../services/examService';

const initialState = {
    exams: [],
    exam: {},
    status: 'idle',
    error: null,
};

export const fetchExams = createAsyncThunk('exams/fetchExams', async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getAllExams(page, limit); // Ensure your service handles these parameters
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchExamById = createAsyncThunk('exams/fetchExamById', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getExamById(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createExamThunk = createAsyncThunk('exams/createExam', async (exam, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await createExam(exam);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateExamThunk = createAsyncThunk('exams/updateExam', async ({ id, exam }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await updateExam(id, exam);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteExam = createAsyncThunk('exams/deleteExam', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await deleteExamApi(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const examSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExams.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchExams.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exams = action.payload;
            })
            .addCase(fetchExams.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchExamById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchExamById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exam = action.payload;
            })
            .addCase(fetchExamById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createExamThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createExamThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exams.push(action.payload);
            })
            .addCase(createExamThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateExamThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateExamThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exams = state.exams.map(exam =>
                    exam._id === action.payload.id ? action.payload : exam
                );
            })
            .addCase(updateExamThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteExam.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exams = state.exams.filter(exam => exam._id !== action.payload);
            })
            .addCase(deleteExam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default examSlice.reducer;

export const examActions = examSlice.actions;
