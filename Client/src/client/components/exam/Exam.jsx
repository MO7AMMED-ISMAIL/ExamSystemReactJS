import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchExam } from '../../slices/exams/examByIdSlice';
import Loader from '../../layouts/Loader';
import ExamContainer from './ExamContainer';
import { addDegreeAsync } from '../../slices/degree/addDegreeSlice';
import { fetchDegreeStatus } from '../../slices/degree/hasDegreeSlice'; 
import NoResult from '../../layouts/NoResult';

const Exam = () => {
    const { examId } = useParams();
    const dispatch = useDispatch();
    const { exam, status: examStatus, error: examError } = useSelector((state) => state.exam);
    const { status: degreeStatus, error: degreeError, hasDegree } = useSelector((state) => state.statusOfDegrees);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [playRightAudio, setPlayRightAudio] = useState(false);
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        dispatch(fetchExam(examId));
        dispatch(fetchDegreeStatus({ student: userId, exam: examId })); 
    }, [examId , userId]);

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

        setIsAnswerCorrect(isCorrect);

        if (isCorrect) {
            setCorrectAnswers((prevCorrectAnswers) => [...prevCorrectAnswers, correctAnswer]);
            setPlayRightAudio(true);
        } else {
            setPlayRightAudio(false);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;

        setCurrentQuestionIndex(nextQuestionIndex);
        if (nextQuestionIndex === exam.questions.length) {
            finishExam();
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const finishExam = async () => {
        const degree = {
            degree: correctAnswers.length, 
            exam: examId,
            student: userId,
        };

        try {
            await dispatch(addDegreeAsync(degree));
        } catch (error) {
            console.error('Failed to add degree:', error);
        }
    };

    if (examStatus === 'loading' || degreeStatus === 'loading') {
        return <Loader />;
    }

    if (examStatus === 'failed') {
        return <div>Error loading exam: {examError}</div>;
    }

    if (degreeStatus === 'failed') {
        return <div>Error fetching degree status: {degreeError}</div>;
    }

    if (!exam) {
        return <div>No exam found.</div>;
    }

    if (!exam.questions || exam.questions.length === 0) {
        return <div>No questions found for the exam.</div>;
    }

    if (hasDegree) {
        return (
            <section className='examCompleted row'>
                <NoResult header={"You have already completed that exam"} />
            </section>
        );
    }

    const props = {
        exam,
        currentQuestionIndex,
        isAnswerCorrect,
        timeLeft,
        correctAnswers,
        handleAnswer,
        formatTime,
        playRightAudio,
    };

    return (
        <ExamContainer {...props} />
    );
};

export default Exam;
