import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import subjectsReducer from '../slices/subjectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
  },
});

export default store;
