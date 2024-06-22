import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import studentSlice from "./studentSlice";
import examReducer from "./examSlice";
import subjectReducer from "./subjectSlice";
import degreeReducer from "./degreeSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        students: studentSlice,
        exams: examReducer,
        subjects: subjectReducer,
        degrees: degreeReducer
    },
})

export default store; 