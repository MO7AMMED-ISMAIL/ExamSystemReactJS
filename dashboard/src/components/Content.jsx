// Content.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Content = () => {
    return (
        <div id="body_content" className="bg-light flex-fill">
            <div className="p-2 d-md-none d-flex text-white bg-info">
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                <FontAwesomeIcon icon={faBars} />
                </button>
                <a href="!" className="navbar-brand ms-3">Cafateria</a>
                <hr />
            </div>
            <div className="p-3">
                <p>Page content goes here</p>
            </div>
        </div>
    );
};

export default Content;