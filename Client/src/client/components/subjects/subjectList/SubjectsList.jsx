import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { fetchSubjectsData } from '../../../slices/subject/subjectSlice'; 
import Loader from '../../../layouts/Loader';
import './SubjList.css';


const SubjectsList = () => {
  const dispatch = useDispatch();
  const { subjects, status, error } = useSelector((state) => state.subjects);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSubjectsData());
    }
  }, [status, dispatch]);

  

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
          <p className="col-12">Check available exams for subjects</p>
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
            <article
             key={subject._id}
             className="col-4">

               <header>
                <h5>{subject.subjectName}</h5>
               </header>


               <nav>
                <Link
                to={`/subjects/${subject._id}`}
                className='text-decoration-none'>
                 Show Exams
                </Link>
               </nav>

            </article>
          ))}
          
        </section>
        
    </section>

    </main>
  );
};

export default SubjectsList;
