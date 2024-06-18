// Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCommentDots, faBell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
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
                        <li><a className="dropdown-item" href="!"><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile</a></li>
                        <li><div className="dropdown-divider"></div></li>
                        <li><a className="dropdown-item" href="!"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;