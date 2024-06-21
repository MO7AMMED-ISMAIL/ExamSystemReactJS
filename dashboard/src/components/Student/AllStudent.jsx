import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { allStudent, deleteStudent } from '../../redux/studentSlice';
import { Link } from 'react-router-dom';

function AllStudent() {
    const dispatch = useDispatch();
    const { students, status, error } = useSelector((state) => state.students);

    const [showModal, setShowModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        dispatch(allStudent());
    }, [dispatch]);

    const handleDeleteClick = (id) => {
        setSelectedStudentId(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        dispatch(deleteStudent(selectedStudentId))
            .unwrap()
            .then(() => {
                setShowModal(false);
                dispatch(allStudent()); // Refresh the student list after deletion
            })
            .catch((error) => {
                console.error('Error deleting student:', error);
                setShowModal(false);
            });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedStudentId(null);
    };

    return (
        <div id="body_content" className="bg-light flex-fill mt-3">
            <Link to="/students/add" className='btn btn-primary m-2'>Add</Link>
            <div className="p-2 d-md-none d-flex text-white bg-info">
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <a href="!" className="navbar-brand ms-3">Cafeteria</a>
                <hr />
            </div>
            <div className="p-3">
                {status === 'loading' && <div className="spinner-border text-primary" role="status"></div>}
                {status === 'failed' && <p className='alert alert-danger text-center mt-2'>{error}</p>}
                <table className="table table-bordered table-hover table-responsive">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            student.role !== 'admin' && (
                                <tr key={student._id}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td><img className='rounded-circle' src={student.image} alt="" style={{ width: '50px', height: '50px' }} /></td>
                                    <td>
                                        <button className='btn btn-danger me-2' onClick={() => handleDeleteClick(student._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this student?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllStudent;
