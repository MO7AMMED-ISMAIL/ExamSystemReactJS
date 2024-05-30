import React from 'react';
import { Provider } from 'react-redux';
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider} from 'react-router-dom';
import store from './store/store';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import SubjectsList from './components/subjects/subjectList/SubjectsList';
import About from './components/about/About';
import Contact from './components/contact/Contact';

export default function App() {
  const routes = createRoutesFromElements(
    <>
      <Route path="/" element={<SubjectsList />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact/>} />

    </>
  );

  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
