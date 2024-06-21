import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamById } from "../../redux/examSlice";
import { Error } from "../../layouts/errors/Error";

export function ExamDetails(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const exam = useSelector((state) => state.exams.exam);
    const status = useSelector((state) => state.exams.status);
    const error = useSelector((state) => state.exams.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchExamById(id));
        }
    }, [dispatch, id]);

    const formatDate = (isoDateString) => {
        if (!isoDateString) return "Not specified";
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`;
    };

    // handel response
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <Error />;
    }

    if (!exam) {
        return <div>Exam not found</div>;
    }

    return (
        <>
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <div className="mt-5 card shadow mb-4">
                        <div className="card-header py-3">
                            <div className="row justify-content-between align-items-center">
                                <h4 className="col text-primary">Show Exam Details</h4>
                                <div className="col-auto text-center">
                                    <Link to="/exams" className="btn btn-outline-primary">
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-5">
                            <div className="mb-3">
                                <strong>Exam Name:</strong> {exam.examName}
                            </div>
                            <div className="mb-3">
                                <strong>Description:</strong> {exam.description}
                            </div>
                            <div className="mb-3">
                                <strong>Date:</strong> {formatDate(exam.date)}
                            </div>
                            <div className="mb-3">
                                <strong>Duration:</strong> {exam.duration} minutes
                            </div>
                            <div className="mb-3">
                                <strong>Subject:</strong> {exam.subject ? exam.subject.subjectName : "Loading subject..."}
                            </div>

                            <div className="mb-3">
                                <strong>Questions:</strong>
                                {exam.questions && exam.questions.length > 0 ? (
                                    <ul className="list-group mt-2">
                                        {exam.questions.map((question) => (
                                            <li key={question._id} className="list-group-item mb-3 shadow-sm p-3 rounded">
                                                <div className="mb-2">
                                                    <strong>{question.questionText}</strong>
                                                </div>
                                                <div>
                                                    <div className="options">
                                                        {question.options.map((option, index) => (
                                                            <div key={index} className="form-check">
                                                                <input
                                                                    type="radio"
                                                                    id={`question-${question._id}-option-${index}`}
                                                                    name={`question-${question._id}`}
                                                                    value={option}
                                                                    className="form-check-input"
                                                                    checked={option === question.correctAnswer}
                                                                    readOnly
                                                                />
                                                                <label
                                                                    htmlFor={`question-${question._id}-option-${index}`}
                                                                    className="form-check-label"
                                                                >
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div>No questions available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}