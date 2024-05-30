import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSubjects } from '../../../slices/subjectSlice'; 
import Loader from '../../../layouts/Loader';
import Sidebar from '../../../layouts/Sidebar'
import './SubjList.css';


const SubjectsList = () => {
  const dispatch = useDispatch();
  const { subjects, status, error } = useSelector((state) => state.subjects);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSubjects());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
     
      <div className="row mx-5">
    <div className="col-2">  <Sidebar /> </div>
        {subjects.map((subject) => (
          <div className="col-md-3 mb-4 my-5" key={subject._id}>
            <div className="card h-100 bg-info text-center card-custom-shadow">
              <div className="card-body">
                <h5 className="card-title">{subject.subjectName}</h5>
                <p className="card-text">{subject.description}</p>
                <Link to={`/exams/${subject._id}`} className="btn btn-primary">Check Available Exams</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsList;
