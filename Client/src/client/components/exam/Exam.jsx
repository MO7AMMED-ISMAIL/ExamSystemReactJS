import React, { useEffect, useState, useRef } from 'react';
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
    const examFinished = useRef(false);
    const examDurationSeconds = exam && exam.duration ? exam.duration * 60 : 0; 

    useEffect(() => {

        dispatch(fetchExam(examId));
        dispatch(fetchDegreeStatus({ student: userId, exam: examId }));

        const handleBeforeUnload = async (event) => {
            if (timerStarted) {
                event.preventDefault();
                event.returnValue = '';
                await finishExam();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
        
    }, [examId, userId, timerStarted]);


    useEffect(() => {
        if (exam && examDurationSeconds > 0) {
            startTimer(examDurationSeconds);
        }
    }, [exam, examDurationSeconds]);


    const startTimer = (durationInSeconds) => {
        setTimeLeft(durationInSeconds);
        setTimerStarted(true);
    };


    useEffect(() => {
        if (timeLeft === 0 && timerStarted && !examFinished.current) {
            alert('Time is up!');
            finishExam();
        }

        if (timeLeft > 0 && timerStarted) {
            const timer = setTimeout(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, timerStarted]);



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
    };



    useEffect(() => {
        if (exam && exam.questions && currentQuestionIndex === exam.questions.length) {
            finishExam();
        }
    }, [currentQuestionIndex, exam]);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    const finishExam = async () => {
        if (examFinished.current) return; 
        examFinished.current = true; 

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
