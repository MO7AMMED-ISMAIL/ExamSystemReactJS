import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchExams } from '../../../slices/exams/examSlice';
import Loader from '../../../layouts/Loader';
import './SubjList.css';
import NoResult from '../../../layouts/NoResult';

const SubjectExams = () => {
  const { subjectId } = useParams();
  const dispatch = useDispatch();
  const { exams, status} = useSelector((state) => state.exams);

  useEffect(() => {
    dispatch(fetchExams(subjectId));
  }, [dispatch, subjectId]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
  
   return <NoResult></NoResult>;
  
  }

  return (
  <main>

      <header>
        <section className='row' >
      <h2 className='col-12 text-center'>Available Exams</h2>
      </section>
      </header>


    <article className='row'>
       <section className="col-6">
        {exams.map((exam) => (
          <>
          <p  class="col-3" key={exam._id}>{exam.examName}
          <Link
          to={`/exam/${exam._id}`}
          className='text-decoration-none btn btn-success btn-sm  '>
           Start
          </Link>
          </p>
         
          </>
        ))}
       </section>


      <aside className='col-5 offset-1'>

      <div>
         <img
          className='examsimg'
          src="/images/bg_3.png"
          alt="Background" />
      </div>

      </aside>

    </article>


   
</main>

  );
};

export default SubjectExams;
