import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchDegree } from '../../api/fetchDegree';

export const fetchDegreeStatus = createAsyncThunk(
  'statusOfDegrees/fetchDegreeStatus',
  async ({ student, exam }) => {
    try {
      const response = await FetchDegree(student, exam);
      return response.hasDegree; 
    } catch (error) {
      console.error('Failed to fetch degree status:', error);
      throw error;
    }
  }
);

const degreeSlice = createSlice({
  name: 'statusOfDegrees', 
  initialState: {
    hasDegree: false,
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDegreeStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDegreeStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hasDegree = action.payload;
      })
      .addCase(fetchDegreeStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default degreeSlice.reducer;
