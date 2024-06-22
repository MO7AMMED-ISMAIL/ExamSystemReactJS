import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../api/authApi';

export const registerUser = createAsyncThunk('register/register', async ({ name, email, password, age, image }) => {
  const response = await register(name, email, password, age, image);
  return response;
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
