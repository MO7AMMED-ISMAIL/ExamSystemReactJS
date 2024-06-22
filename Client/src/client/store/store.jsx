import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import subjectsReducer from '../slices/subject/subjectSlice';
import examsReducer from '../slices/exams/examSlice';
import examReducer from '../slices/exams/examByIdSlice';
import degreesReducer from '../slices/degree/addDegreeSlice'; 
import statusOfDegreesReducer from '../slices/degree/hasDegreeSlice';
import registerReducer from '../slices/registerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        subjects: subjectsReducer,
        exams: examsReducer,
        exam: examReducer,
        degrees: degreesReducer, 
        statusOfDegrees: statusOfDegreesReducer,
    },
});

export default store;
