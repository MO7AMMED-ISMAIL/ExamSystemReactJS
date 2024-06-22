import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDegrees } from "../redux/degreeSlice";
import { allStudent } from "../redux/studentSlice";
import { fetchExams } from "../redux/examSlice";
import { fetchSubjects } from "../redux/subjectSlice";
import { Error } from "../layouts/errors/Error";

export function HomePage() {
    const dispatch = useDispatch();
    const degrees = useSelector((state) => state.degrees.degrees || []);
    const degreeStatus = useSelector((state) => state.degrees.status);
    const degreeError = useSelector((state) => state.degrees.error);
    const status = useSelector((state) => state.degrees.status);

    const students = useSelector((state) => state.students.students);
    const exams = useSelector((state) => state.exams.exams);
    const subjects = useSelector((state) => state.subjects.subjects);
    const degreesCount = degrees.length;

    const [currentPage, setCurrentPage] = useState(1);
    const degreesPerPage = 20;

    // Calculate the index of the first and last degrees for the current page
    const indexOfLastDegree = currentPage * degreesPerPage;
    const indexOfFirstDegree = indexOfLastDegree - degreesPerPage;
    const currentDegrees = degrees.slice(indexOfFirstDegree, indexOfLastDegree);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(degrees.length / degreesPerPage);

    useEffect(() => {
        if (degreeStatus === "idle") {
            dispatch(fetchDegrees({ page: currentPage, limit: degreesPerPage }));
        }
        dispatch(allStudent());
        dispatch(fetchExams());
        dispatch(fetchSubjects());
    }, [dispatch, degreeStatus, currentPage]);

    if (degreeStatus === "failed") {
        return <Error />;
    }

    if (status === "loading") {
        return <div className="row justify-content-center align-content-center">
            <div className="spinner-border text-primary tex-center my-5" role="status"></div>
        </div>;
    }

    return (
        <div className="mx-1 mt-5">
            <div className="row justify-content-center align-items-center mb-4">
                <div className="col-md-3">
                    <Card className="shadow-sm bg-success text-light">
                        <Card.Body>
                            <Card.Title>Students</Card.Title>
                            <Card.Text>{students.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card className="shadow-sm bg-primary text-light">
                        <Card.Body>
                            <Card.Title>Exams</Card.Title>
                            <Card.Text>{exams.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card className="shadow-sm bg-warning text-light">
                        <Card.Body>
                            <Card.Title>Subjects</Card.Title>
                            <Card.Text>{subjects.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card className="shadow-sm bg-info text-light">
                        <Card.Body>
                            <Card.Title>Degrees</Card.Title>
                            <Card.Text>{degreesCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <div className="card shadow mb-5">
                        <div className="card-header py-3">
                            <div className="row justify-content-between align-items-center">
                                <h4 className="col text-muted">Degrees</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            {degreeStatus === 'loading' &&
                                <div className="row justify-content-center align-content-center">
                                    <div className="spinner-border text-primary tex-center my-5"
                                         role="status"></div>
                                </div>
                            }
                            {degreeStatus === "failed" && <div>Error: {degreeError}</div>}
                            {degreeStatus === "succeeded" && (
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
                                            <th>Student</th>
                                            <th>Exam</th>
                                            <th>Degree</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {currentDegrees.map((degree, index) => (
                                            <tr key={degree._id}>
                                                <td>{indexOfFirstDegree + index + 1}</td>
                                                <td>{degree.student ? degree.student.name : 'loading...'}</td>
                                                <td>{degree.exam ? degree.exam.examName : 'loading...'}</td>
                                                <td>{degree.degree}</td>
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
                                        <span>Showing {currentPage} to {totalPages} of {degrees.length} entries</span>
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
        </div>
    );
}
