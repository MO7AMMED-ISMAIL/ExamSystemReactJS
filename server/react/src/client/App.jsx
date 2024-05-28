import React from 'react';
import { Provider } from 'react-redux';
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import store from './store/store';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';

export default function App() {
  const routes = createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </>
  );

  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
