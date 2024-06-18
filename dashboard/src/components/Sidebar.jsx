// Sidebar.js
import React from 'react';
import '../css/sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div id="sidebar" className="d-flex flex-column flex-shrink-0 p-3 text-bg-info text-white offcanvas-md offcanvas-start">
            <a href="!" className="navbar-brand">Cafateria</a>
            <hr />
            <ul className="mynav nav nav-pills flex-column flex-grow-1 pe-3 mb-auto">
                <li className="nav-item mb-1">
                    <Link to="/home/student" className="nav-link text-white active" aria-current="page">
                        Student
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <a href="!" className="nav-link text-white" aria-current="page">
                        {/* <FontAwesomeIcon icon={faUser} className="fa-regular" /> */}
                        Admins
                    </a>
                </li>
                <li className="nav-item mb-1">
                    <a href="!" className="nav-link text-white" aria-current="page">
                        {/* <FontAwesomeIcon icon={faUser} className="fa-regular" /> */}
                        Admins
                    </a>
                </li>
            </ul>
            <hr />
            <div className="d-flex">
                {/* <FontAwesomeIcon icon={faBook} className="fa-solid me-2" /> */}
                <span>
                <h6 className="mt-1 mb-0">Cafateria</h6>
                </span>
            </div>
        </div>
    );
};

export default Sidebar;