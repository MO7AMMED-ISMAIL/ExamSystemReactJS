import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import studentSlice from "./studentSlice";
import examReducer from "./examSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        students: studentSlice,
        exams: examReducer,
    },
})

export default store; 