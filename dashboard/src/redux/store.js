import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import studentSlice from "./studentSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        students: studentSlice
    },
})


export default store; 