import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./components/AuthComponent/Login";
import SharedLayout from "./layouts/SharedLayout";
import PrivateRoute from "./components/PrivateRoute";
import AllStudent from "./components/Student/AllStudent";
import UserProfile from "./components/AuthComponent/UserProfile";
import {ExamForm} from "./components/Exam/ExamForm";
import {ExamList} from "./components/Exam/ExamList";
import React from "react";
import {ExamDetails} from "./components/Exam/ExamDetails";
import {NotFound} from "./layouts/errors/NotFound";
import {Error} from "./layouts/errors/Error";
import {examDetailsLoader, examFormLoader} from "./loaders/loaders";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<PrivateRoute errorElement={<Error />}>
                    <SharedLayout />
                </PrivateRoute>
                }>
                    <Route path="profile" element={<UserProfile/>}/>
                    <Route path="students" element={<AllStudent/>}/>
                    <Route path="exams" element={<ExamList/>} />
                    <Route path="exams/new" element={<ExamForm/>} loader={examFormLoader} />
                    <Route path="exams/:id" element={<ExamDetails/>} loader={examDetailsLoader} errorElement={<Error />}/>
                    <Route path="exams/:id/edit" element={<ExamForm/>} errorElement={<Error />}/>
                </Route>
                <Route path='*' element={<NotFound/>}/>
            </>
        )
    );
    return (
        < >
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
