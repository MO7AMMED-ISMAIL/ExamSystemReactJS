import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteExam, fetchExams } from "../../redux/examSlice";
import { Error } from "../../layouts/errors/Error";

export function ExamList() {
    const dispatch = useDispatch();
    const exams = useSelector((state) => state.exams.exams || []);
    const status = useSelector((state) => state.exams.status);
    const error = useSelector((state) => state.exams.error);
    const [currentPage, setCurrentPage] = useState(1);
    const examsPerPage = 20;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deletingExamId, setDeletingExamId] = useState(null);

    // Calculate the index of the first and last exams for the current page
    const indexOfLastExam = currentPage * examsPerPage;
    const indexOfFirstExam = indexOfLastExam - examsPerPage;
    const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(exams.length / examsPerPage);

    useEffect(() => {
        dispatch(fetchExams({ page: currentPage, limit: examsPerPage }));
    }, [dispatch, currentPage]);

    const handleDelete = (examId) => {
        dispatch(deleteExam(examId));
        setShowConfirmation(false);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleShowConfirmation = (examId) => {
        setDeletingExamId(examId);
        setShowConfirmation(true);
    };

    // Format date and time from ISO string
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleDateString(); // Adjust format as needed
        const formattedTime = date.toLocaleTimeString(); // Adjust format as needed
        return `${formattedDate} ${formattedTime}`;
    };

    if (status === "failed") {
        return <Error />;
    }

    if (status === "loading") {
        return <div className="row justify-content-center align-content-center">
                    <div className="spinner-border text-primary tex-center my-5" role="status"></div>
                </div>;
    }

    return (
        <div className="mx- mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <div className="card shadow mb-5">
                        <div className="card-header py-3">
                            <div className="row justify-content-between align-items-center">
                                <h4 className="col text-muted">Our Exams</h4>
                                <div className="col-auto text-center">
                                    <Link to="/exams/0/edit" className="btn btn-outline-primary">
                                        Add New Exam
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {status === 'loading' &&
                                <div className="row justify-content-center align-content-center">
                                    <div className="spinner-border text-primary tex-center my-5" role="status"></div>
                                </div>
                            }
                            {status === "failed" && <div>Error: {error}</div>}
                            {status === "succeeded" && (
                                <>
                                    <Table
                                        className="table-bordered table-hover table-responsive"
                                        striped
                                        bordered
                                        hover
                                    >
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Subject</th>
                                            <th>Duration</th>
                                            <th>No Of Qs</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentExams.map((exam, index) => (
                                            <tr key={exam._id}>
                                                <td>{indexOfFirstExam + index + 1}</td>
                                                {/* Display number from 1 to exams.length */}
                                                <td>{exam.examName}</td>
                                                <td>{exam.subject ? exam.subject.subjectName : "Loading subject..."}</td>
                                                <td>{exam.duration} minutes</td>
                                                <td>{exam.questions.length}</td>
                                                <td>{formatDate(exam.date)}</td>
                                                <td className="w-25">
                                                    <div className="row justify-content-start align-items-start">
                                                        <div className="col-auto">
                                                            <Link
                                                                to={`/exams/${exam._id}`}
                                                                className="btn btn-outline-success p-2"
                                                            >
                                                                Show
                                                            </Link>
                                                        </div>

                                                        <div className="col-auto">
                                                            <Link
                                                                to={`/exams/${exam._id}/edit`}
                                                                className="btn btn-outline-warning p-2"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </div>

                                                        <div className="col-auto">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger p-2"
                                                                onClick={() => handleShowConfirmation(exam._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            disabled={currentPage === 1}
                                            onClick={() => paginate(currentPage - 1)}
                                        >
                                            Previous
                                        </Button>
                                        <span>Showing {currentPage} to {totalPages} of {exams.length} entries</span>
                                        <Button
                                            disabled={currentPage === totalPages}
                                            onClick={() => paginate(currentPage + 1)}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this exam?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmation}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(deletingExamId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
