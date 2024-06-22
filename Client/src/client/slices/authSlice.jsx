import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/authApi';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await login(email, password);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userId: null,
    token: localStorage.getItem('token'),
    loggedIn: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      state.loggedIn = false;
      state.status = 'idle';
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userId = action.payload.id;
        state.loggedIn = true;
        state.status = 'succeeded';
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userId', action.payload.id);
      })
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
