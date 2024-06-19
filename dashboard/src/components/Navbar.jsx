// Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCommentDots, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logout");
        localStorage.clear();
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow rounded p-3">
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-info" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto d-flex flex-row">
                <li className="nav-item me-3 me-lg-0">
                    <a className="nav-link" href="#!">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </a>
                </li>
                <li className="nav-item me-3 me-lg-0">
                    <a className="nav-link" href="#!">
                        <FontAwesomeIcon icon={faCommentDots} className="fa-lg" />
                    </a>
                </li>
                <li className="nav-item me-3 me-lg-0">
                    <a className="nav-link" href="#!">
                        <FontAwesomeIcon icon={faBell} className="fa-lg" />
                    </a>
                </li>
                <li className="nav-item dropdown me-3 me-lg-0">
                    <a className="nav-link dropdown-toggle" href="!" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {
                                localStorage.getItem('name')
                            }
                        </span>
                        <img className="rounded-circle" src={localStorage.getItem('image')} width="20px" height="20px" alt="User Avatar" />
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/home/profile"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile</Link></li>
                        <li><div className="dropdown-divider"></div></li>
                        <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalId"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout</button></li>
                    </ul>
                </li>
            </ul>


            
            
            <div
                className="modal fade"
                id="modalId"
                tabIndex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                
                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog "
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">
                                Modal title
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">Body</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleLogout} data-bs-dismiss="modal" className="btn btn-primary">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            
            

        </nav>
    );
};

export default Navbar;