import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllDegrees } from '../services/degreeService';

const initialState = {
    degrees: [],
    degree: {},
    status: 'idle',
    error: null,
};

export const fetchDegrees = createAsyncThunk('degrees/fetchDegrees', async ({ page = 1, limit = 2 } = {}, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await getAllDegrees(page, limit);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const degreeSlice = createSlice({
    name: 'degrees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDegrees.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDegrees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.degrees = action.payload;
            })
            .addCase(fetchDegrees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload : 'Failed to fetch degrees';
            })

    },
});

export default degreeSlice.reducer;
