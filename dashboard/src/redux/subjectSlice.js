import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSubject, deleteSubject as deleteSubjectApi, getAllSubjects, getSubjectById, updateSubject } from '../services/subjectService';

const initialState = {
    subjects: [],
    subject: {},
    status: 'idle',
    error: null,
};

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async ({ page = 1, limit = 2 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getAllSubjects(page, limit);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchSubjectById = createAsyncThunk('subjects/fetchSubjectById', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getSubjectById(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createSubjectThunk = createAsyncThunk('subjects/createSubject', async (subject, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await createSubject(subject);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateSubjectThunk = createAsyncThunk('subjects/updateSubject', async ({ id, subject }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await updateSubject(id, subject);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteSubject = createAsyncThunk('subjects/deleteSubject', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await deleteSubjectApi(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subjects = action.payload;
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch subjects';
            })
            .addCase(fetchSubjectById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSubjectById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subject = action.payload;
            })
            .addCase(fetchSubjectById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch subject by id';
            })
            .addCase(createSubjectThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createSubjectThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subjects.push(action.payload);
            })
            .addCase(createSubjectThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to create subject';
            })
            .addCase(updateSubjectThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateSubjectThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subjects = state.subjects.map(subject =>
                    subject._id === action.payload._id ? action.payload : subject
                );
            })
            .addCase(updateSubjectThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to update subject';
            })
            .addCase(deleteSubject.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteSubject.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subjects = state.subjects.filter(subject => subject._id !== action.payload);
            })
            .addCase(deleteSubject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to delete subject';
            });
    },
});

export default subjectSlice.reducer;
