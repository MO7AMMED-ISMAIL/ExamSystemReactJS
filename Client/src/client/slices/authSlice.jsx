import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';


export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await login(email, password);
  return response;
});


export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password, age, image }) => {
  const response = await register(name, email, password, age, image);
  return response;
});


export const setUser = createAction('auth/setUser');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loggedIn: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
   
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loggedIn = true;
        localStorage.setItem('token', action.payload.token);
      })
    
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
     
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
     
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
          state.error = null;
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