import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'; 
import { fetchSubjectsData } from '../../../slices/subject/subjectSlice'; 
import { logout } from '../../../slices/authSlice';
import Loader from '../../../layouts/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './SubjList.css';

const SubjectsList = () => {

  const dispatch = useDispatch();
  const { subjects, status, error } = useSelector((state) => state.subjects);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSubjectsData());
    }
  }, [status]);


  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedOut(true);
  };


  if (isLoggedOut) {
    return <Navigate to="/login" />;
  }

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }


  return (

    <main className='container-fluid'>

      <header>

        <section className="row">
          <p className="col-12 display-6">Check available exams for subjects</p>
        </section>

      </header>

      <section className="row">

        <aside className="col-4">
          <div>
            <img
             src="./images/bg_2.png"
             alt="Background" />
          </div>
        </aside>

        <section className="col-8">
          {subjects.map((subject) => (
            <article key={subject._id} className="col-4">
              <header>
                <h5>{subject.subjectName}</h5>
              </header>
              <nav>
                <Link to={`/subjects/${subject._id}`} className='text-decoration-none'>
                  Show Exams
                  <FontAwesomeIcon icon={faBook} className="ml-1 mx-2" />
                </Link>
              </nav>
            </article>
          ))}
        </section>

      </section>

      <Link
        onClick={handleLogout}
        className='text-decoration-none text-success h4'>
        <FontAwesomeIcon icon={faArrowLeft} />
        Logout
      </Link>
    </main>
  );
};

export default SubjectsList;
