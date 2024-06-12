import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchExam } from '../../slices/exams/examByIdSlice';
import Loader from '../../layouts/Loader';
import ExamContainer from './ExamContainer';

const Exam = () => {
    const { examId } = useParams();
    const dispatch = useDispatch();
    const { exam, status, error } = useSelector((state) => state.exam);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [playRightAudio, setPlayRightAudio] = useState(false); 

    useEffect(() => {
        dispatch(fetchExam(examId));
    }, [dispatch, examId]);

    useEffect(() => {
        if (exam) {
            setTimeLeft(exam.duration * 60);
        }
    }, [exam]);

    useEffect(() => {
        if (timeLeft === 0) {
            alert('Time is up!');
        }

        if (timeLeft > 0 && timerStarted) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, timerStarted]);

    useEffect(() => {
        if (timeLeft !== null) {
            const startTimer = setTimeout(() => setTimerStarted(true), 2000);
            return () => clearTimeout(startTimer);
        }
    }, [timeLeft]);

    const handleAnswer = (selectedAnswer, correctAnswer) => {
        const isCorrect = selectedAnswer === correctAnswer;

        if (isCorrect) {
            setCorrectAnswers((prevCorrectAnswers) => [...prevCorrectAnswers, correctAnswer]);
            setPlayRightAudio(true); 
        }

        setIsAnswerCorrect(isCorrect);

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

        setTimeout(() => {
            setIsAnswerCorrect(null);
            setPlayRightAudio(false); 
        }, 1000); 

    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!exam) {
        return <div>No exam found.</div>;
    }

    if (!exam.questions) {
        return <div>No questions found for the exam.</div>;
    }

    return (
        <ExamContainer
            exam={exam}
            currentQuestionIndex={currentQuestionIndex}
            isAnswerCorrect={isAnswerCorrect}
            timeLeft={timeLeft}
            correctAnswers={correctAnswers}
            handleAnswer={handleAnswer}
            formatTime={formatTime}
            playRightAudio={playRightAudio} 
        />
    );
};

export default Exam;
