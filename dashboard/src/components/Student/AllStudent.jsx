import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { allStudent } from '../../redux/studentSlice';
import {Link} from "react-router-dom";
import {Button, Modal, Table} from "react-bootstrap";

function AllStudent() {
    const dispatch = useDispatch();
    const { students, status, error } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(allStudent());
    }, [dispatch]);

    return (
        <div className="mx-1 mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <div className="card shadow mb-5">
                        <div className="card-header py-3">
                            <div className="row justify-content-between align-items-center">
                                <h4 className="col text-muted">Our Students</h4>
                                {/*<div className="col-2 text-center">
                                    <Link to="/students/0/edit" className="btn btn-outline-primary">
                                        Add New Student
                                    </Link>
                                </div>*/}
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
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            {/*<th>Actions</th>*/}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {students.map((student, index) => (
                                            <tr key={student._id}>
                                                <td>{index + 1}</td>
                                                <td><img className='rounded-circle' src={student.image} alt=""
                                                         style={{width: '50px', height: '50px'}}/></td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                {/*<td className="w-25">
                                                    <div className="row justify-content-start align-items-start">
                                                        <div className="col-auto">
                                                            <Link
                                                                to={`/students/${student._id}`}
                                                                className="btn btn-outline-success p-2"
                                                            >
                                                                Show
                                                            </Link>
                                                        </div>

                                                        <div className="col-auto">
                                                            <Link
                                                                to={`/students/${student._id}/edit`}
                                                                className="btn btn-outline-warning p-2"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </div>

                                                        <div className="col-auto">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger p-2"
                                                                onClick={() => handleShowConfirmation(student._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
*/}
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllStudent;
