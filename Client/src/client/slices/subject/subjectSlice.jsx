import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchSubjects} from '../../api/subjectApi';


export const fetchSubjectsData = createAsyncThunk('subjects/fetchSubjectsData', async () => {
  const response = await fetchSubjects();
  return response; 
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
      .addCase(fetchSubjectsData.fulfilled, (state, action) => {
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
