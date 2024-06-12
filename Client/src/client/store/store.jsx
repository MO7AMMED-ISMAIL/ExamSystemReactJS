import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import subjectsReducer from '../slices/subject/subjectSlice';
import examsReducer from '../slices/exams/examSlice';
import examReducer from '../slices/exams/examByIdSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    exams: examsReducer,
    exam: examReducer,
  },
});

export default store;
