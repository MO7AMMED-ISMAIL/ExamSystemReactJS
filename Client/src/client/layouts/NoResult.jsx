import React from 'react';
import './NoResult.css'; 

const NoResult = () => {
    return (
        <>
        <div className="sad-face">
          <div className="eyes">
            <div className="eye left"></div>
            <div className="eye right"></div>
          </div>
          <div className="mouth"></div>
        </div>

        <div>
      <h1 className='text-center'>No Available Exams</h1>
        </div>
        </>
      );
    };
    

export default NoResult;
