import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import store from './store/store';
import Loader from './layouts/Loader';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './protected/ProtectedRoutes';
import NoResult from './layouts/NoResult';


const SubjectsList = lazy(() => import('./components/subjects/subjectList/SubjectsList'));
const Exam = lazy(() => import('./components/exam/Exam'));
const SubjectExams = lazy(() => import('./components/subjects/subjectList/SubjectExams'));


export default function App() {
  
  const routes = createRoutesFromElements(
    <>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route element={<ProtectedRoute />}>

        <Route
          path="/subject"
          element={
            <Suspense fallback={<Loader />}>
              <SubjectsList />
            </Suspense>
          }
        />

         <Route
          path="/subjects/:subjectId"
          element={
            <Suspense fallback={<Loader />}>
              <SubjectExams />
            </Suspense>
          }
        />

        <Route
          path="/exam/:examId"
          element={
            <Suspense fallback={<Loader />}>
              <Exam />
            </Suspense>
          }
        />
       

      </Route>

      <Route path="*" element={<NoResult header={"Not Found"} />} />


    </>
  );

  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
