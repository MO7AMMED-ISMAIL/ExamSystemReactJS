import React, { useEffect} from 'react';
import { Clock } from 'react-bootstrap-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Exam.css';
import rightAudio from '/right.mp3'; 

export default function ExamContainer({ exam, currentQuestionIndex, isAnswerCorrect, timeLeft, correctAnswers, handleAnswer, formatTime, playRightAudio }) {
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
                    />
                </aside>

                <content className="col-7 offset-1">
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
                                 key={index} className="btn btn-success m-2 my-5"
                                 onClick={() => handleAnswer(option, exam.questions[currentQuestionIndex].correctAnswer)}>
                                 {option}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center my-5'>
                            <h4>Exam Completed!</h4>
                            <p>Correct Answers: {correctAnswers.length}</p>
                        </div>
                    )}
                </content>

            </section>
        </main>
    );
}
