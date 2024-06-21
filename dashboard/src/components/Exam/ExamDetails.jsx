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
    const [subject, setSubject] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchExamById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (exam && exam.subject) {
            fetchSubjectDetails(exam.subject);
        }
    }, [exam]);

    const fetchSubjectDetails = async (subjectId) => {
        try {
            const response = await fetch(`/api/subjects/${subjectId}`);
            if (response.ok) {
                const data = await response.json();
                setSubject(data);
            } else {
                console.error("Failed to fetch subject details");
            }
        } catch (error) {
            console.error("Error fetching subject details:", error);
        }
    };

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
                                <strong>Subject:</strong> {subject ? subject.subjectName : "Loading subject..."}
                            </div>

                            {/* Render questions if needed */}
                            {/* <div className="mb-3">
                                <strong>Questions:</strong>
                                <ul className="list-group mt-2">
                                    {exam.questions.map((question) => (
                                        <li key={question._id} className="list-group-item">
                                            <div>{question.questionText}</div>
                                            <div>
                                                <strong>Options:</strong> {question.options.join(", ")}
                                            </div>
                                            <div>
                                                <strong>Correct Answer:</strong> {question.correctAnswer}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
