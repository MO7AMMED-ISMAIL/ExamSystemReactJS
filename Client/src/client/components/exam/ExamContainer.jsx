import React, { useEffect, useState } from 'react';
import { Clock } from 'react-bootstrap-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Swal from 'sweetalert2';
import './Exam.css';
import rightAudio from '/right.mp3';


export default function ExamContainer({ exam, currentQuestionIndex, isAnswerCorrect, timeLeft, correctAnswers, handleAnswer, formatTime, playRightAudio }) {
  
    const pass = Math.ceil(exam.questions.length / 2);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        if (playRightAudio) {
            const audio = new Audio(rightAudio);
            audio.play();
        }
    }, [playRightAudio]);


    useEffect(() => {

        const handlePopstate = (event) => {
            event.preventDefault();
            if (!alertShown) {
                alert('You cannot go back during the exam.');
                setAlertShown(true);
            }
            window.history.forward();
        };

        window.addEventListener('popstate', handlePopstate);

        window.history.pushState(null, null, window.location.href);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };

    }, [alertShown]);


    useEffect(() => {

        if (currentQuestionIndex === exam.questions.length) {
            handleExamCompletion();
        }
    }, [currentQuestionIndex, exam.questions.length]);

    const handleExamCompletion = () => {
        const examPassed = correctAnswers.length >= pass;

        Swal.fire({
            title: examPassed ? 'Congratulations! You Passed!' : 'Sorry! You Failed!',
            text: `Correct Answers: ${correctAnswers.length}`,
            icon: examPassed ? 'success' : 'error',
            confirmButtonText: 'Go to Subjects',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/subject'; 
            } 
        });

    };


    return (

        <main className='container-fluid exam-container'>

            <header className='row'>

                <aside className='col-9 offset-1'>
                    <h2 className='text-center col-12'>{exam.examName}</h2>
                    <p className='text-center col-12 text-success'>{exam.description}</p>
                </aside>

                <aside className='col-1 offset-1'>
                    <Clock size={20} />
                    <span className="ms-1">{formatTime(timeLeft)}</span>
                </aside>
                
            </header>

            <section className='row'>

                <aside className='col-4'>
                    <img
                        src="/images/bg_1.png"
                        alt="Background"
                        className="img-fluid"
                    />
                </aside>

                <div className="col-7 questionContainer">
                    <ProgressBar
                        now={(currentQuestionIndex / exam.questions.length) * 100}
                        label={`${currentQuestionIndex} / ${exam.questions.length}`}
                        variant={isAnswerCorrect === null ? 'info' : isAnswerCorrect ? 'success' : 'danger'}
                    />

                    {currentQuestionIndex < exam.questions.length ? (
                        <div className='my-5 text-center'>
                            <h4>{exam.questions[currentQuestionIndex].questionText}</h4>
                            {exam.questions[currentQuestionIndex].options.map((option, index) => (
                                <button
                                    key={index}
                                    className="btn btn-success m-2 my-5 col-4"
                                    onClick={() => handleAnswer(option, exam.questions[currentQuestionIndex].correctAnswer)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    ) : null}

                </div>

            </section>
            
        </main>
    );
}


