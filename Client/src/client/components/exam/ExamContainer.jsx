import React, { useEffect } from 'react';
import { Clock } from 'react-bootstrap-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Exam.css';
import rightAudio from '/right.mp3'; 

export default function ExamContainer({ exam, currentQuestionIndex, isAnswerCorrect, timeLeft, correctAnswers, handleAnswer, formatTime, playRightAudio }) {
    
    const pass = Math.ceil(exam.questions.length / 2);

    useEffect(() => {
        if (playRightAudio) {
            const audio = new Audio(rightAudio);
            audio.play();
        }
    }, [playRightAudio]);



    return (

        <main className='container-fluid exam-container'>

            <header className='row'>

                <aside className='col-9 offset-1'>
                    <h2 className='text-center col-12'>{exam.examName}</h2>
                    <p className='text-center col-12'>{exam.description}</p>
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

                <content className="col-7">
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
                    ) : (
                        <div className='text-center my-5'>
                            <h4>Exam Completed!</h4>
                            <p>Correct Answers: {correctAnswers.length}</p>
                            {correctAnswers.length >= pass ? (
                                <p className="text-success display-6 my-5">Congratulations! You passed the exam.</p>
                            ) : (
                                <p className="text-danger display-6 my-5">Sorry! You failed the exam.</p>
                            )}
                        </div>
                    )}
                </content>

            </section>

        </main>

    );
}

