import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { allStudent } from '../../redux/studentSlice';

function AllStudent() {
    const dispatch = useDispatch();
    const { students, status, error } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(allStudent());
    }, [dispatch]);

    return (
        <div id="body_content" className="bg-light flex-fill mt-3">
            <div className="p-2 d-md-none d-flex text-white bg-info">
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                <FontAwesomeIcon icon={faBars} />
                </button>
                <a href="!" className="navbar-brand ms-3">Cafeteria</a>
                <hr />
            </div>
            <div className="p-3">
                {status === 'loading' && <div className="spinner-border text-primary" role="status"></div>}
                {status === 'failed' &&  <p className='alert alert-danger text-center mt-2'>{error}</p>}
                <table className="table table-bordered table-hover table-responsive">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student) => {
                                if (student.role !== 'admin') {
                                    return (
                                        <tr key={student._id}>
                                            <td>{student._id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.age}</td>
                                            <td><img className='rounded-circle' src={student.image} alt="" style={{width: '50px', height: '50px'}}/></td>
                                            <td>
                                                <div className='d-flex'>
                                                    <a href='!' className='btn btn-primary ms-2'>Add</a>
                                                    <a href='!' className='btn btn-warning ms-2'>Edit</a>
                                                    <a href='!' className='btn btn-danger ms-2'>delete</a>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllStudent;
