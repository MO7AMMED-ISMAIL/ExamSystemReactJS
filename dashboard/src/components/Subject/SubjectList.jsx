import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, fetchSubjects } from "../../redux/subjectSlice";
import { Error } from "../../layouts/errors/Error";

export function SubjectList() {
    const dispatch = useDispatch();
    const subjects = useSelector((state) => state.subjects.subjects || []);
    const status = useSelector((state) => state.subjects.status);
    const error = useSelector((state) => state.subjects.error);
    const [currentPage, setCurrentPage] = useState(1);
    const subjectsPerPage = 4;
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deletingSubjectId, setDeletingSubjectId] = useState(null);

    // Calculate the index of the first and last subjects for the current page
    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = subjects.slice(indexOfFirstSubject, indexOfLastSubject);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(subjects.length / subjectsPerPage);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSubjects({ page: currentPage, limit: subjectsPerPage }));
        }
    }, [dispatch, status, currentPage]);

    const handleDelete = (subjectId) => {
        dispatch(deleteSubject(subjectId));
        setShowConfirmation(false);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleShowConfirmation = (subjectId) => {
        setDeletingSubjectId(subjectId);
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

    return (
        <div className="mx- mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <div className="card shadow mb-5">
                        <div className="card-header py-3">
                            <div className="row justify-content-between align-items-center">
                                <h4 className="col text-muted">Our Subjects</h4>
                                <div className="col-2 text-center">
                                    <Link to="/subjects/0/edit" className="btn btn-outline-primary">
                                        Add New Subject
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {status === "loading" && <div>Loading...</div>}
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
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentSubjects.map((subject, index) => (
                                            <tr key={subject._id}>
                                                <td>{indexOfFirstSubject + index + 1}</td>
                                                {/* Display number from 1 to subjects.length */}
                                                <td>{subject.subjectName}</td>
                                                <td>{subject.description}</td>
                                                <td className="w-25">
                                                    <div className="row justify-content-start align-items-start">
                                                        <div className="col-auto">
                                                            <Link
                                                                to={`/subjects/${subject._id}`}
                                                                className="btn btn-outline-success p-2"
                                                            >
                                                                Show
                                                            </Link>
                                                        </div>

                                                        <div className="col-auto">
                                                            <Link
                                                                to={`/subjects/${subject._id}/edit`}
                                                                className="btn btn-outline-warning p-2"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </div>

                                                        <div className="col-auto">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger p-2"
                                                                onClick={() => handleShowConfirmation(subject._id)}
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
                                        <span>Showing {currentPage} to {totalPages} of {subjects.length} entries</span>
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
                <Modal.Body>Are you sure you want to delete this subject?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmation}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(deletingSubjectId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
