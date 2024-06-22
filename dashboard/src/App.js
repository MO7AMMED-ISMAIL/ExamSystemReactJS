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
import {examDetailsLoader, examFormLoader, subjectDetailsLoader, subjectFormLoader} from "./loaders/loaders";
import {SubjectList} from "./components/Subject/SubjectList";
import {SubjectForm} from "./components/Subject/SubjectForm";
import {SubjectDetails} from "./components/Subject/SubjectDetails";
import AddStudent from "./components/Student/AddStudent";


import {HomePage} from "./components/HomePage";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<PrivateRoute errorElement={<Error />}>
                    <SharedLayout />
                </PrivateRoute>
                }>
                    <Route path="" element={<HomePage/>}/>
                    <Route path="profile" element={<UserProfile/>}/>
                    <Route path="students" element={<AllStudent/>}/>
                    <Route path="students/add" element={<AddStudent/>}/>
                    <Route path="exams" element={<ExamList/>} />
                    <Route path="exams/new" element={<ExamForm/>} />
                    <Route path="exams/:id" element={<ExamDetails/>} loader={examDetailsLoader} errorElement={<Error />}/>
                    <Route path="exams/:id/edit" element={<ExamForm/>} loader={examFormLoader} errorElement={<Error />}/>

                    <Route path="subjects" element={<SubjectList/>}/>
                    <Route path="subjects/:id" element={<SubjectDetails/>} loader={subjectDetailsLoader} errorElement={<Error />}/>
                    <Route path="subjects/:id/edit" element={<SubjectForm/>} errorElement={<Error />} loader={subjectFormLoader} />
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
