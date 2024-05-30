import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';


export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => {
  const response = await axios.get('/subjects');
  return response.data.data; 
});

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subjects = action.payload; 
      })
      .addMatcher(
        (action) => action.type.startsWith('subjects/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('subjects/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default subjectsSlice.reducer;
